const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({

    image: {
        public_id: String,
        url: String
    },
    title: {
        type: String
    },
    Like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comments" }],
}, { timestamps: true })

const Post = mongoose.model("Posts", postSchema)


module.exports = Post