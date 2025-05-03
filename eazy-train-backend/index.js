import express from 'express'
import cors from 'cors'
import loginRouter from './routes/loginRouter.js'
import signUpRouter from './routes/signUpRouter.js'
import dotenv from 'dotenv';
import trainRouter from './routes/trainRouter.js'

import tripsRouter from './routes/tripsRouter.js'
import myBookingsRouter from './routes/myBookingsRouter.js'
import adminRouter from './routes/createAdminRouter.js'
import tripRouter from './routes/tripRouter.js'
import userRouter from './routes/userRouter.js'

import operatorRouter from './routes/operatorRoutes.js'

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
app.use('/admin',adminRouter)
app.use('/trips', tripRouter)
app.use('/trains', trainRouter)

// Ahmad Trips
app.use('/tripsa', tripsRouter)
app.use('/myBookings', myBookingsRouter)
app.use('/user', userRouter)


app.use('/trips', tripRouter)
app.use('/operators', operatorRouter)


app.listen(PORT, () => console.log(`http://localhost:${PORT}`))
