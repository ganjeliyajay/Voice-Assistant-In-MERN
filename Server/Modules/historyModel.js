import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        userMessage: {
            type: String,
            required: true,
        },

        assistantResponse: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const History = mongoose.model(
    "History",
    historySchema
);

export default History;