import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { DatabaseConncet } from './Configs/db.js';
import { routes } from './Routes/AuthRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const isProduction = process.env.NODE_ENV === "production";
app.use(cors({
    origin: [
        'https://virtual-voicegi-assistant.netlify.app/'
    ],             // ✅ local dev
    credentials: true,
}));

// Database connected
DatabaseConncet();

// Routes
app.use('/assistant', routes);

// Health check (optional)
app.get('/', (req, res) => {
    res.send('✅ Voice Assistant Backend is running on Render!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port: ${PORT}`));
