const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    }],
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chats"
    }]
}, { timestamps: true })

const Conversations = mongoose.model("Conversations", ConversationSchema)

module.exports = Conversations