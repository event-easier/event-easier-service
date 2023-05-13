import jwt from "jsonwebtoken";
import axios from "axios";

function generateZoomJwt() {
  const payload = {
    iss: process.env.ZOOM_API_KEY,
    exp: (Date.now() + 3600 * 1000) * 24, // 24 hours
  };
  const token = jwt.sign(payload, process.env.ZOOM_API_SECRET);
  return token;
}

export async function createMeeting(topic, start_time, duration, type = 2) {
  const token = generateZoomJwt();
  const zoomApiUrl = "https://api.zoom.us/v2/users/me/meetings";
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const data = {
    topic,
    type,
    start_time,
    duration,
  };

  const response = await axios.post(zoomApiUrl, data, { headers });
  return response.data;
}
