import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
  },
  type: {
    type: String,
    require: true,
  },
  calendars: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "calendars",
      },
      role: {
        type: String,
        enum: ["ADMIN", "GUEST"],
        required: true,
        default: "GUEST",
      },
    },
  ],
});

export default mongoose.model("users", UserSchema);
