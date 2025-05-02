import { StreamChat } from 'stream-chat';
import 'dotenv/config';

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY and STREAM_API_SECRET must be set in .env file");
  process.exit(1);
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData); 
    return userData;
  } catch (error) {
    console.error('Error creating or updating Stream user:', error);
    throw error;
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userStr = userId.toString();
    return streamClient.createToken(userStr);
  } catch (error) {
    console.error('Error generating Stream token:', error);
    throw error;
  }
};
