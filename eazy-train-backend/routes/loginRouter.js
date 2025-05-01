import dotenv from 'dotenv'
import { Router } from 'express'
import jwt from 'jsonwebtoken';

dotenv.config()
const SECRET = process.env.JWT_SECRET
const loginRouter = Router()

const user = {
    id: 1,
    username: 'test@test',
    password: 'testpass'
  }

loginRouter.post('/', (req, res) => {
    const { username, password } = req.body
  
    if (username === user.username && password === user.password) {
      const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '1h' })
      return res.json({ token })
    } else {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
})

export default loginRouter