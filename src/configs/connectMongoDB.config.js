import mongoose  from 'mongoose';
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.development' });

const connectDatabase = async () => {
  try {
    const dbConfig = process.env.MONGODB_URL;
    const connect = await mongoose.connect(dbConfig);
    console.log(`Mongodb: ${connect.connection.host}`);
  } catch (e) {
    console.log('Error connect');
  }
}

export default connectDatabase;