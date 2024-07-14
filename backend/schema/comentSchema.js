const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    }
}, { timestamps: true })

const Comment = mongoose.model("Comments", CommentSchema)


module.exports = Comment