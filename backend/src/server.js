import express from 'express';
import "dotenv/config";
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/user", userRoutes);
app.use('api/chat', chatRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
