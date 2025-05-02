import express from 'express'
import cors from 'cors'
import loginRouter from './routes/loginRouter.js'
import signUpRouter from './routes/signUpRouter.js'
import dotenv from 'dotenv';
import trainRouter from './routes/trainRouter.js'
// initialize firebase admin SDK
// import './utils/firebaseAdmin.js'
// import { initializeApp } from 'firebase-admin/app';
// initializeApp();


dotenv.config()
const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())
app.get("/train", (req, res) => {
    
})
app.get("/",(req,res)=> {
    res.send("Working")
})

app.use('/login',loginRouter)
app.use('/signup',signUpRouter)
app.use('/trains', trainRouter)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
