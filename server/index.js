import express from 'express'; 
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Database connected locally"))
  .catch((error) => console.log("Database connection failed:", error));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);

app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(cookieParser());
app.use('/', userRoute);
app.use('/admin', adminRoute);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
