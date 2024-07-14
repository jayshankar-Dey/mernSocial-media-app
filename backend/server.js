const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const colors = require('colors');
const connectDB = require('./DB/connectDb');
const userRouter = require('./routes/routes');
const Errorhandle = require('./middlewares/ErrorHandle');
const cloudinary = require('cloudinary')
const { Server } = require('socket.io')
const { createServer } = require('http');
const User = require('./schema/userSchema');
require('dotenv').config()
const app = express()
const server = createServer(app)
const io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    //middlewire
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//db connection
connectDB()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

app.get('/', (req, res) => res.send("<h1 style='color:red'> wellcome to rest api </h1>"))

///
app.use('/api', userRouter)

app.use(Errorhandle)

let users = {}

const finduser = (id) => {
    return users[id]
}
let userData = []

////sockit io//////////////////
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('adduser', async({ userId, socketID }) => {
        if (userId) {
            users[userId] = socketID
            const find = userData.find((data) => data.userId == userId)
            if (!find) userData.push({ userId, socketID })
        }
    })

    ////request
    socket.on("addfriends", ({ id }) => {
            const user = finduser(id)
            if (user) {
                io.to(user).emit("request", "RequestSuccesfully")
            }

        })
        ////unrequest
    socket.on("unfriends", ({ id }) => {
        const user = finduser(id)
        if (user) {
            io.to(user).emit("unrequest", "Un_RequestSuccesfully")
        }
    })

    socket.on("sendNotification", data => {
        const user = finduser(data.senderId)
        if (user) {
            io.to(user).emit("getNotifacion", "message send succesfully")
        }
    })

    socket.on("sendMessage", data => {
        io.emit("getmessage", data)
    })

    io.emit('onlineuser', userData)

    socket.on('disconnect', () => {
        console.log('user disconnect')
        userData = userData.filter((user) => user.socketID !== socket.id)

    })
});



server.listen(process.env.PORT, () => {
    console.log(`server is starting on port http://localhost:${process.env.PORT}`.bgGreen)
})