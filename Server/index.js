import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import hotelsRoutes from './routes/hotels.js'
import roomsRoutes from './routes/rooms.js'
import cookieParser from 'cookie-parser'
const app = express()
dotenv.config()


const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION)
        console.log('connected to mongodb')
    } catch (error) {
        throw error
    }    
}



// middleware
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/hotels', hotelsRoutes)
app.use('/api/rooms', roomsRoutes)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


app.listen(5000, () => {
    connect()
    console.log(`Server running on port 5000`)
})