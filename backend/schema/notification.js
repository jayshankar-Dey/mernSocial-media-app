const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    message: {
        type: String
    },
    seen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const Notification = mongoose.model("Notification", NotificationSchema)

module.exports = Notification