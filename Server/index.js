import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { DatabaseConncet } from "./Configs/db.js";
import { routes } from "./Routes/AuthRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("trust proxy", 1);

const isProduction = process.env.NODE_ENV === "production";

app.use(
    cors({
        origin: isProduction
            ? [process.env.CLIENT_URL]
            : ["http://localhost:5173"],
        credentials: true,
    })
);

DatabaseConncet();

app.use("/assistant", routes);

app.get("/", (req, res) => {
    res.send("✅ Voice Assistant Backend is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`🚀 Server is running on port: ${PORT}`)
);
