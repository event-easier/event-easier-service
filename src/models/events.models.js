import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: Object,
    require: true,
    event_type: {
      enum: ["VIRTUAL", "IN_PERSON", "ZOOM"],
      required: true,
      default: "IN_PERSON",
    },
  },
  cover: {
    type: String,
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  require_approve: {
    type: Boolean,
  },
  hosts: [{ avatar: String, name: String, user_id: String, gmail: String }],
  guests: [
    {
      avatar: {
        type: String,
        default:
          "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,quality=85,width=40,height=40/avatars/fl/b0bf5590-b242-4c88-ae4d-a6987373989e",
      },
      name: { type: String, default: "YOU" },
      user_id: { type: String, default: "" },
      gmail: String,
      status: {
        type: String,
        enum: ["APPROVED", "REJECTED", "PENDING"],
        required: true,
        default: "PENDING",
      },
    },
  ],
});

export default mongoose.model("events", EventSchema);
