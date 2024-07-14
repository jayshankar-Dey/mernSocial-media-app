const mongoose = require('mongoose')


const ChatSchema = new mongoose.Schema({
    senderID: {
        type: String,
        required: true
    },
    reciverID: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Chats = mongoose.model("Chats", ChatSchema)

module.exports = Chats