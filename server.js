import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

import { authRouter } from "./routes/authRoutes.js";


 
app.use(express.json());

app.use('/api/auth', authRouter);




app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
