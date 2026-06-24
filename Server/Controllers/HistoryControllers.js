import History from "../Modules/historyModel.js";

export const saveHistory = async (req,res) => {
    try {
        const {userMessage,assistantResponse} = req.body;

        const userId = req.userId;

        if (
            !userId ||
            !userMessage ||
            !assistantResponse
        ) {
            return res.status(400).json({
                message: "All fields required",
            });
        }

        const history = await History.create({
            userId,
            userMessage,
            assistantResponse,
        });

        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getHistory = async (
    req,
    res
) => {
    try {
        const userId = req.userId;

        const history = await History.find({
            userId,
        }).sort({ createdAt: -1 });
        console.log(history)

        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};