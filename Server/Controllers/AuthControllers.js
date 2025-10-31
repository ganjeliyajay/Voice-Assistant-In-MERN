import { $user } from "../Modules/UserModule.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import { genToken } from "../Configs/token.js"

//register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(500).json({ message: `Inputs are required!` })
        }

        const findUser = await $user.findOne({ email })
        if (findUser) {
            return res.status(500).json({ message: `You are already register` })
        }

        if (password.length < 4) {
            return res.status(500).json({ message: `Please enter password length more than 4 character` })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await $user({ name, email, password: hashPassword })
        //token ne call karayo and pchi generate token generate karayo
        const token = await genToken(user._id)

        res.cookie('loginToken', token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })
        await user.save()



        res.status(200).json({ message: `Regisatation successfully complete!` })

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: `Regisatation error: ${error}` })
    }
}

//login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(500).json({ message: `Inputs are required!` })
        }

        const user = await $user.findOne({ email })
        if (!user) {
            return res.status(500).json({ message: `User does not exits` })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).json({ message: `Password is incorrect` })
        }

        const token = await genToken(user._id)

        res.cookie('loginToken', token, {
            httpOnly: true,
            maxAge: 10 * 24 * 60 * 60 * 1000,
            sameSite: "strict",
            secure: false
        })

        res.status(200).json({ message: `Login successfully !` })


    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: `Login error : ${error}` })
    }
}

//auto login
export const autoLogin = async (req, res) => {
    try {
        const id = req.cookies.loginToken
        if (!id) {
            return res.status(401).json({ message: `Token not found` })
        }
        const verifyToken = jwt.verify(id, process.env.SECURE_KEY)
        if (!verifyToken) {
            return res.status(401).json({ message: `Invalid token` })
        }

        res.status(200).json( verifyToken )

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: `Auto login error : ${error}` })
    }
}

//logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('loginToken')
        res.status(200).json({ message: `Logout successfully !` })
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: `logout error : ${error}` })
    }
}