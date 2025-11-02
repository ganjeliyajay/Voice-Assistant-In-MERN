import { Router } from "express";
import { assistantName, autoLogin, getUser, login, logout, register } from "../Controllers/AuthControllers.js";
import { askToAssistant } from "../Controllers/GeminiController.js";
import isAuth from "../Configs/isAuth.js";

export const routes = Router()
routes.route('/register').post(register)
routes.route('/login').post(login)
routes.route('/login/me').get(autoLogin)
routes.route('/logout').post(logout)
routes.route('/assistant').post(isAuth, assistantName)
routes.route('/user').get(isAuth, getUser)


//gemini routes
routes.route('/command').post(isAuth, askToAssistant)