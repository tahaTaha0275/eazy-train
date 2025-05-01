import dotenv from 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import {users} from "../utils/utils.js"
dotenv.config()
const SECRET = process.env.JWT_SECRET
const signUpRouter = Router()

signUpRouter.post('/', (req, res) => {
    const { username, password } = req.body
    // console.log(users)
    const currentUser = users.find(user => user.username === username )
    if (currentUser ) {
        return res.status(401).json({ message: 'User Already Exists' })
    } else {
        users.push({id: users.length + 1, username:username, password: password})
        const newUser = users[users.length - 1 ]
        const token = jwt.sign({ id: newUser.id, username:newUser.username }, SECRET, { expiresIn: '1h' })
        sessionStorage.setItem('token', token)
        return res.json({ token })

    }
})

export default signUpRouter