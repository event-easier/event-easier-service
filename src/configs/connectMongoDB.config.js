import mongoose from "mongoose";


const connectDatabase = async () => {
  try {
    const dbConfig = process.env.MONGODB_URL;
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb: ${connect.connection.host}`);
  } catch (e) {
    console.log("Error connect");
  }
};

export default connectDatabase;
