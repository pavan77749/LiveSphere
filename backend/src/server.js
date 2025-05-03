import express from 'express';
import "dotenv/config";
import authRoutes from './routes/auth.route.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials: true, // Access-Control-Allow-Credentials:true
}));

app.use("/api/auth",authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/chat', chatRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
