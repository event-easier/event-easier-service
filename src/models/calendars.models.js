import mongoose from "mongoose";
const CalendarSchema = new mongoose.Schema({
  type: { type: String, default: "Personal" },
  cover: {
    require: true,
    type: String,
  },
  avatar: {
    require: true,
    type: String,
  },
  calendarName: {
    type: String,
    required: true,
  },
  description: {
    require: true,
    type: String,
  },
  customURL: {
    require: true,
    type: String,
  },
  location: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  color: { type: String, default: "red" },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: "events" }],
  people: [
    {
      avatar: String,
      name: String,
      user_id: String,
      gmail: String,
      subscribed: Boolean,
    },
  ],
});

export default mongoose.model("calendars", CalendarSchema);
