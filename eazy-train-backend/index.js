import express from 'express'
import cors from 'cors'
import loginRouter from './routes/loginRouter.js'
import dotenv from 'dotenv';

dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=> {
    res.send("Working")
})

app.use('/login',loginRouter)
app.use('/signup',loginRouter)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
