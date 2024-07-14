const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        profile: {
            public_id: String,
            url: String
        },
        des: {
            type: String
        },
        online: {
            type: Boolean,
            default: false
        },
        post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Posts" }],
        request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],

    }, { timestamps: true })
    ///hash password
userSchema.pre('save', async function(next) {
        const user = this
        if (!user.isModified('password')) next()
        user.password = await bcrypt.hash(user.password, 10)
    })
    //genarate token
userSchema.methods.genaratetoken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET)
}

//compaire password
userSchema.methods.compairePassword = function(password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("Users", userSchema)
module.exports = User