import dotenv from 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import {users} from "../utils/utils.js"
dotenv.config()
const SECRET = process.env.JWT_SECRET
const loginRouter = Router()

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body
    const currentUser = users.find(user => user.username === username && user.password === password);
    if (currentUser) {
      const token = jwt.sign({ id: currentUser.id, username: currentUser.username,role: currentUser.role }, SECRET, { expiresIn: '1h' })
      return res.json({ token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
})

export default loginRouter