import { model, Schema } from "mongoose";

export const $user = model(
    'user', Schema({
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            uniqe: true
        },
        password: {
            type: String,
            require: true
        },
        assistantname: {
            type: String,
            require: true
        }
    })
)