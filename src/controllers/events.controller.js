import eventsModels from "../models/events.models.js";
import { createZoomMeeting } from "../utils/zoom.utils.js";
import usersModels from "../models/users.models.js";
import {
  notification,
  registrationConfirmed,
  sendEmailInvited,
} from "../utils/email.utils.js";

export const create = async (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a event
  // Check type
  const { type } = req.body;
  let data_event_type = {};
  if (type.event_type == "IN_PERSON") {
    data_event_type = {
      event_type: type.event_type,
      location: type.location,
    };
  } else if (type.event_type == "VIRTUAL") {
    data_event_type = {
      event_type: type.event_type,
      event_url: type.event_url,
    };
  } else if (type.event_type == "ZOOM") {
    const data = await createZoomMeeting();
    data_event_type = {
      event_type: type.event_type,
      zoom_url: data.joinUrl,
      zoom_id: data.zoomMeeting.id,
      zoom_password: data.zoomMeeting.password,
    };
  }
  const event = new eventsModels({
    name: req.body.name,
    type: data_event_type,
    cover: req.body.cover,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    require_approve: req.body.require_approve
      ? req.body.require_approve
      : false,
    hosts: req.body.hosts,
    guests: req.body.guests,
  });

  // Save event in the database
  event
    .save()
    .then((data) => {
      res.status(200).send({
        message: "Event create successfull.",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the event.",
      });
    });
};

export const findOne = (req, res) => {
  const id = req.params.id;

  eventsModels
    .findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found event with id " + id });
      else {
        res.status(200).send({
          message: "Event found successfull.",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving event with id=" + id });
    });
};

export const findAll = (req, res) => {
  const user_id = req.userId;
  // create an condition
  const condition = {
    $or: [
      { "hosts.user_id": user_id ? user_id : "" },
      { "guests.user_id": user_id ? user_id : "" },
    ],
  };
  // query condition
  eventsModels
    .find(condition)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found event with id " + id });
      } else {
        res.status(200).send({
          message: "Events found successfull.",
          data: data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Events.",
        data: [],
      });
    });
};

export const updateById = (req, res) => {
  const id = req.params.id;
  const event = req.body;
  const userId = req.userId;
  console.log(userId, id);
  eventsModels
    .findByIdAndUpdate(id, { $set: event }, { new: true })
    .where({ "hosts.user_id": userId })
    .then((data) => {
      if (!data) {
        console.log(data);
        res.status(404).send({ message: "Not found event with id " + id });
      } else {
        res
          .status(200)
          .json({ data: data, message: "updated event with id: " + id });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating event with id=" + id,
      });
    });
};
//  mời tham gia
export const inviteGuests = async (req, res) => {
  const id = req.params.id;
  const event = await eventsModels.findById(id);

  const host = event.hosts.find((u) => u.user_id === req.userId);
  if (!event || host === undefined) {
    res
      .status(404)
      .json({ message: "Not found event with id " + id, or: "guest in event" });
    return;
  } else {
    await sendEmailInvited({
      data: event,
      host: host.gmail,
      email: req.body.email,
      message: req.body.message,
    });
    const hasEmail = event.guests.some((guests) =>
      guests.gmail?.includes(req.body.email)
    );
    if (!hasEmail) {
      const newGuest = {
        gmail: req.body.email,
      };
      event.guests.push(newGuest);
      await event.save();
    }
    res.status(200).json({
      message: "Email sent successfully",
    });
  }
};

// chấp nhận tham gia (host)
export const confirm = async (req, res) => {
  const id = req.params.id; // id event
  const event = await eventsModels.findById(id);
  const host = event.hosts.find((u) => u.user_id === req.userId);
  const guest = event.guests.find((u) => u.gmail === req.body.guestGmail);
  if (!event || host === undefined || guest === undefined) {
    res.status(404).send({ message: "Not found event with id " + id });
    return;
  } else {
    const filter = { "guests.gmail": guest.gmail, _id: id };
    const update = {
      $set: {
        "guests.$.status": "APPROVED",
      },
    };
    await eventsModels.findOneAndUpdate(filter, update, { new: true });
    await registrationConfirmed({
      data: event,
      email: req.body.email,
      hostEmail: host.gmail,
      hostName: host.name,
    });
    res.status(200).json({
      message: "Email sent successfully",
    });
  }
};

// người đăng ký mới (user)
export const newRegistration = async (req, res) => {
  const id = req.params.id;
  const event = await eventsModels.findById(id);
  const user = await usersModels.findById(req.userId);
  const guest = event.guests.find((u) => u.user_id === req.userId);
  if (!event || guest) {
    return res.status(400).json({ message: "can't join event" });
  } else {
    const pendingGuest = event.guests.filter(
      (guest) => guest.status === "PENDING"
    );
    const approvedGuest = event.guests.filter(
      (guest) => guest.status === "APPROVED"
    );
    const numberOfPending = pendingGuest.length;
    const numberOfApproved = approvedGuest.length;
    const newGuest = {
      avatar: user.avatar,
      name: user.name,
      gmail: user.email,
      user_id: req.userId,
      status: "PENDING",
    };
    event.guests.push(newGuest);
    const a = await event.save();
    console.log("a,  ", a);
    await notification({
      data: event,
      email: event.hosts[0].gmail,
      user: user,
      status: req.body.status,
      approved: numberOfApproved,
      pending: numberOfPending + 1,
    });
    res.status(200).json({ message: "success" });
  }
};

// chấp nhận tham gia ( từ user )
export const acceptTheJoin = async (req, res) => {
  const id = req.params.id;
  const event = await eventsModels.findById(id);
  const user = await usersModels.findById(req.userId);
  const guest = event.guests.find((u) => u.user_id === req.userId);
  const pendingGuest = event.guests.filter(
    (guest) => guest.status === "PENDING"
  );
  const approvedGuest = event.guests.filter(
    (guest) => guest.status === "APPROVED"
  );
  const numberOfPending = pendingGuest.length;
  const numberOfApproved = approvedGuest.length;

  if (!event || !guest) {
    res.status(404).json({
      message: "can't join this event",
      error:
        "you can't join this event. Please try again with another email address",
    });
  } else {
    const filter = { "guests.gmail": user.email, _id: id };
    const update = {
      $set: {
        "guests.$.status": "APPROVED",
        "guests.$.user_id": req.userId,
        "guests.$.name": user.name,
        "guests.$.avatar": user.avatar,
      },
    };
    await eventsModels.findOneAndUpdate(filter, update, { new: true });
    await registrationConfirmed({
      data: event,
      email: user.email,
      hostEmail: event.hosts[0].gmail,
      hostName: event.hosts[0].name,
    });
    await notification({
      data: event,
      email: event.hosts[0].gmail,
      user: user,
      status: req.body.status,
      approved: numberOfApproved + 1,
      pending: numberOfPending,
    });
    res.status(200).json({ message: "success" });
  }
};

// email thông báo có người đăng ký hoặc chấp nhận mới
// export const newRegistration = async (req, res) => {
//   const id = req.params.id; // id của event
//   const event = await eventsModels.findById(id);
//   if (!event)
//     return res.status(404).json({ error: "can not find event with id " + id });
//   const guest = event.guests.find((u) => u.user_id === req.userId);
//   const user = await usersModels.findById(req.userId);
//   const pendingGuest = event.guests.filter(
//     (guest) => guest.status === "PENDING"
//   );
//   const approvedGuest = event.guests.filter(
//     (guest) => guest.status === "APPROVED"
//   );
//   const numberOfPending = pendingGuest.length;
//   const numberOfApproved = approvedGuest.length;

//   if (guest) {
//     res.status(404).json({
//       message: "guest in event",
//     });
//     return;
//   } else {
//     await notification({
//       data: event,
//       email: event.hosts[0].gmail,
//       user: user,
//       status: req.body.status,
//       approved:
//         req.body.status === "accepted"
//           ? numberOfApproved + 1
//           : numberOfApproved,
//       pending:
//         req.body.status === "register"
//           ? numberOfPending + 1
//           : numberOfPending - 1,
//     });
//     if (req.body.status === "accepted") {
//       const filter = { "guests.gmail": user.email, _id: id };
//       const update = {
//         $set: {
//           "guests.$.status": "APPROVED",
//           "guests.$.user_id": req.userId,
//           "guests.$.name": user.name,
//           "guests.$.avatar": user.avatar,
//         },
//       };
//       await eventsModels.findOneAndUpdate(filter, update, {
//         new: true,
//       });
//       await registrationConfirmed({
//         data: event,
//         email: user.email,
//         hostEmail: event.hosts[0].gmail,
//         hostName: event.hosts[0].name,
//       });
//     } else {
//       const newGuest = {
//         avatar: user.avatar,
//         name: user.name,
//         gmail: user.email,
//         user_id: req.userId,
//         status: "PENDING",
//       };
//       event.guests.push(newGuest);
//       await event.save();
//       console.log("newGuest", newGuest);
//     }
//     res.status(200).json({
//       message: "Email sent successfully",
//     });
//   }
// };
