import { Router } from "express";
import { autoLogin, login, logout, register } from "../Controllers/AuthControllers.js";
import { askToAssistant } from "../Controllers/GeminiController.js";

export const routes = Router()
routes.route('/register').post(register)
routes.route('/login').post(login)
routes.route('/login/me').get(autoLogin)
routes.route('/logout').post(logout)


//gemini routes
routes.route('/command').post(askToAssistant)