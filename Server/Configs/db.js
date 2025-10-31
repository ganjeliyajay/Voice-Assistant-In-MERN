import mongoose from "mongoose"

export const DatabaseConncet = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log('Database Connecnted!')
    } catch (error) {
        console.log(`Database problem : ${error}`)
    }

}