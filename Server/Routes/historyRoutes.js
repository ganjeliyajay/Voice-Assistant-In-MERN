import { Router } from "express";
import { getHistory, saveHistory } from "../Controllers/HistoryControllers.js";
import isAuth from "../Configs/isAuth.js";

const historyRoutes = Router();

historyRoutes.post("/save", isAuth, saveHistory);
historyRoutes.get("/getHistory", isAuth, getHistory);

export default historyRoutes;