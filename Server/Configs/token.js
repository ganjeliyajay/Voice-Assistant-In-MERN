import jwt from 'jsonwebtoken'
export const genToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.SECURE_KEY, { expiresIn: '10d' })
        return token
    } catch (error) {
        console.log(error)
    }
}