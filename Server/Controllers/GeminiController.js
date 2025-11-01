import { geminiResponse } from "../../Gemini.js"
import moment from "moment"

export const askToAssistant = async (req, res) => {
    try {

        const { command } = req.body

        const result = await geminiResponse(command)

        const jsonMatch = result.match(/{[/s/S]*}/)
        if (!jsonMatch) {
            return res.stauts(400).json({ response: `sorry, i can't unserderstand` })
        }

        const gemResult = JSON.parse(jsonMatch[0])

        const type = gemResult.type

        switch (type) {
            case 'get-date':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `current date is ${moment().format("YYYY-MM-DD")}`
                });
            case 'get-time':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `current time is ${moment().format("hh:mm A")}`
                });
            case 'get-day':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `today is ${moment().format("dddd")}`
                });
            case 'get-month':
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `today is ${moment().format("MMMM")}`
                });
            case 'google-search':
            case 'youtube-search':
            case 'youtube-play':
            case 'general':
            case "calculator-open":
            case "instagram-open":
            case "facebook-open":
            case "weather-show":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response,
                });

            default:
                return res.status(400).json({ response: "I didn't understand that command." })
        }

    } catch (error) {
        return res.status(500).json({ response: "as assistant error" })
    }
}