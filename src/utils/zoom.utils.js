import jwt from "jsonwebtoken";
import axios from "axios";

export const createZoomMeeting = async () => {
  const apiKey = process.env.ZOOM_API_KEY;
  const apiSecret = process.env.ZOOM_API_SECRET;
  const url = "https://api.zoom.us/v2/users/me/meetings";

  const jwtToken = generateJwtToken(apiKey, apiSecret);

  try {
    const response = await axios.post(
      url,
      {
        topic: "Zoom Meeting",
        type: 2,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );

    const zoomMeeting = response.data;
    const joinUrl = zoomMeeting.join_url;

    return { zoomMeeting, joinUrl };
  } catch (error) {
    console.error("Error creating Zoom meeting:", error.message);
  }
};

const generateJwtToken = (apiKey, apiSecret) => {
  const payload = {
    iss: apiKey,
    exp: Math.floor(Date.now() / 1000) + 60, // Expiration time: 60 seconds from now
  };
  return jwt.sign(payload, apiSecret);
};
