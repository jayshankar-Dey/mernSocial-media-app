const User = require("../schema/userSchema")
const getFile = require('../config/getFile')
const cloudinary = require('cloudinary')
class AuthController {
    //send otp
    register = async(req, res, next) => {
        try {
            const { name, email, password, cnfpassword } = req.body

            const user = await User.findOne({ email })
            if (user) return res.json({ success: false, message: "email alrady register" })

            if (password === cnfpassword) {
                await User.create({ name, email, password })
                return res.json({
                    success: true,
                    message: "register Succesfully"
                })
            } else {
                return res.json({
                    success: false,
                    message: "password and confirm password not match"
                })
            }

        } catch (error) {
            next(error)
        }
    }

    login = async(req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })
            if (!user) return res.json({ success: false, message: "email not register " })
            const passwordComapaire = await user.compairePassword(password)

            if (!passwordComapaire) return res.json({ success: false, message: "please enter valide email and password" })

            const token = await user.genaratetoken()

            return res.json({
                success: true,
                message: "login Succesfully",
                token,
                user: user._id
            })
        } catch (error) {
            next(error)
        }
    }

    update = async(req, res, next) => {
            try {

                const { name, des } = req.body

                console.log(name, des)
                const user = await User.findById(req.user)
                if (name) user.name = name
                if (des) user.des = des
                if (user.profile.public_id && req.file) {
                    const file = getFile(req.file)
                    await cloudinary.v2.uploader.destroy(user.profile.public_id)
                    const cdb = await cloudinary.v2.uploader.upload(file.content)
                    user.profile = {
                        public_id: cdb.public_id,
                        url: cdb.secure_url
                    }
                } else {
                    if (req.file) {
                        const file = getFile(req.file)
                        const cdb = await cloudinary.v2.uploader.upload(file.content)
                        user.profile = {
                            public_id: cdb.public_id,
                            url: cdb.secure_url
                        }
                    }
                }
                await user.save()
                return res.json({
                    success: true,
                    message: "profile update Succesfully",
                    user
                })
            } catch (error) {
                console.log(error)
                next(error)
            }
        }
        ///get user profile
    getProfile = async(req, res, next) => {
            try {
                const { id } = req.params
                const userid = id ? { _id: id } : { _id: req.user }
                const user = await User.findById(userid).populate({
                    path: "friends",
                    model: "Users",
                }).populate({
                    path: "post",
                    model: "Posts"
                })
                return res.json({
                    success: true,
                    message: "profile update Succesfully",
                    user
                })
            } catch (error) {
                next(error)
            }
        }
        ///get all user Searching/////////
    getAllUsers = async(req, res, next) => {
        try {
            const userid = await User.findById(req.user)
            let id = [req.user]
            userid.friends.forEach((user) => {
                id.push(user.toString())
            })

            const { name } = req.query
            const search = name ? { name: { $regex: name, $options: "i" } } : {
                _id: {
                    $nin: id
                }
            }
            const user = await User.find(search, { post: 0 })
            return res.json({
                success: true,
                message: "users get Succesfully",
                user
            })
        } catch (error) {
            next(error)
        }
    }

    //get loginuser data
    getUserData = async(req, res, next) => {
        try {
            const user = await User.findById({ _id: req.user }, { post: 0, password: 0 })
            return res.json({
                success: true,
                message: "profile update Succesfully",
                user
            })
        } catch (error) {
            next(error)
        }
    }



    ///request/////
    request = async(req, res, next) => {
            try {
                const { id } = req.body
                const user = await User.findByIdAndUpdate(id, {
                    $addToSet: {
                        request: req.user
                    }
                })

                return res.json({
                    success: true,
                    message: "request Succesfully",
                    user
                })

            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///unrequest
    unrequest = async(req, res, next) => {
        try {
            const { id } = req.body
            const user = await User.findByIdAndUpdate(id, {
                $pull: {
                    request: req.user
                }
            })

            return res.json({
                success: true,
                message: "unrequest Succesfully",
                user
            })

        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ///show request user
    showRequestedUser = async(req, res, next) => {
            try {
                const user = await User.findById(req.user, { request: 1 }).populate({
                    path: "request",
                    model: "Users",
                })
                return res.json({
                    success: true,
                    message: "requested user show Succesfully",
                    user
                })

            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///confirm user request
    Confirm_request = async(req, res, next) => {
        try {
            const { id } = req.body
            console.log(id)
            const loginuser = await User.findByIdAndUpdate(req.user, {
                $addToSet: {
                    friends: id
                }
            })
            const requestuser = await User.findByIdAndUpdate(id, {
                    $addToSet: {
                        friends: req.user
                    }
                })
                // loginuser.friends.addToSet(id)
                // requestuser.friends.addToSet(req.user)
            loginuser.request.pull(id)
            requestuser.request.pull(req.user)
            await loginuser.save()
            await requestuser.save()
            return res.json({
                success: true,
                message: "unrequest Succesfully",
                loginuser,
            })

        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ///cancle request
    calclerequest = async(req, res, next) => {
        try {
            const { id } = req.body
            const user = await User.findByIdAndUpdate(req.user, {
                $pull: {
                    request: id
                }
            })

            return res.json({
                success: true,
                message: "cancle Succesfully",
                user
            })

        } catch (error) {
            next(error)
            console.log(error)
        }
    }


    ///getFollow User
    getFrinde_User = async(req, res, next) => {
        try {

            const friends = await User.findById(req.user, { friends: 1 }).populate({
                path: "friends",
                model: "Users"
            })
            return res.json({
                success: true,
                message: "friends get Succesfully",
                friends
            })

        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}
module.exports = new AuthController();