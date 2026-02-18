import moment from "moment";
import { geminiResponse } from "../Gemini.js";
import { $user } from "../Modules/UserModule.js";

export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body;

        if (!command) {
            return res.status(400).json({ response: "Command is required." });
        }

        const userId = req.userId;

        const user = await $user.findById(userId);
        if (!user) {
            return res.status(400).json({ response: "User not found" });
        }

        const assistantName = user.assistantname;

        const result = await geminiResponse(command, assistantName);

        if (!result) {
            return res.status(400).json({ response: "Empty response from Gemini." });
        }

        const jsonMatch = result.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            return res.status(400).json({ response: "Sorry, I couldn't understand that." });
        }

        let gemResult;
        try {
            gemResult = JSON.parse(jsonMatch[0]);
        } catch {
            return res.status(400).json({
                response: "Invalid response format from assistant."
            });
        }

        const type = gemResult.type;

        switch (type) {
            case "get-date":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current date is ${moment().format("YYYY-MM-DD")}`,
                });

            case "get-time":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Current time is ${moment().format("hh:mm A")}`,
                });

            case "get-day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `Today is ${moment().format("dddd")}`,
                });

            case "get-month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `This month is ${moment().format("MMMM")}`,
                });

            default:
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response || "I didn't understand that command.",
                });
        }
    } catch (error) {
        console.error("❌ Assistant Error:", error);
        return res.status(500).json({
            response: "Assistant error while processing your command.",
            error: error.message,
        });
    }
};
