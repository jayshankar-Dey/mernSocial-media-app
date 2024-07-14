const cloudinary = require('cloudinary')
const getFile = require('../config/getFile')
const postSchema = require('../schema/postSchema')
const User = require('../schema/userSchema')

const commentSchema = require('../schema/comentSchema')
class PostCotroller {
    //create post////////
    createPost = async(req, res, next) => {
        try {
            const { title } = req.body
            if (!title || !req.file) res.json({ message: "please Provide all fields" })
            const file = getFile(req.file)
            const cdb = await cloudinary.v2.uploader.upload(file.content)
            const image = {
                public_id: cdb.public_id,
                url: cdb.secure_url
            }
            const post = await postSchema.create({ image, title, user: req.user })
            await User.findByIdAndUpdate(req.user, {
                $addToSet: {
                    post: post._id
                }
            })
            res.json({
                message: "Post created succesfully",
                post
            });
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    ///get all posts
    getAllPost = async(req, res, next) => {
            try {
                const { id } = req.params
                const find = id ? { _id: id } : {}
                const post = await postSchema.find(find).populate({
                    path: "user",
                    model: "Users",
                    select: "profile name"
                }).populate({
                    path: "comments",
                    model: "Comments",
                    populate: {
                        path: "user",
                        model: "Users",
                        select: "profile name"
                    }
                }).sort({ 'createdAt': -1 })
                res.json({
                    message: "Post get succesfully",
                    post
                });
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///edit post/////////
    edditPost = async(req, res, next) => {
            try {
                const { title } = req.body
                const { id } = req.params
                const post = await postSchema.findById(id)
                if (post.user.toString() == req.user.toString()) {
                    if (title) post.title = title
                    if (req.file) {
                        const file = getFile(req.file)
                        await cloudinary.v2.uploader.destroy(post.image.public_id)
                        const cdb = await cloudinary.v2.uploader.upload(file.content)
                        post.image = {
                            public_id: cdb.public_id,
                            url: cdb.secure_url
                        }
                    }
                    await post.save()
                    res.json({
                        message: "Post update succesfully",
                        post
                    });
                } else {
                    res.json({
                        message: "valide user can update this post"
                    })
                }
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///deletePost
    deletePost = async(req, res, next) => {
            try {
                const { id } = req.params
                const post = await postSchema.findById(id)
                if (post.user == req.user) {
                    await cloudinary.v2.uploader.destroy(post.image.public_id)
                    await post.deleteOne()
                }
                res.json({
                    message: "Post delete succesfully"
                });
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///like post
    likepost = async(req, res, next) => {
            try {
                const { id } = req.body
                await postSchema.findByIdAndUpdate(id, {
                    $addToSet: {
                        Like: req.user
                    }
                })
                res.json({
                    message: "Post like succesfully"
                });
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        //unlike post
    unlikepost = async(req, res, next) => {
            try {
                const { id } = req.body
                await postSchema.findByIdAndUpdate(id, {
                    $pull: {
                        Like: req.user
                    }
                })
                res.json({
                    message: "Post unlike succesfully"
                });
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ////////////////////////////comment part////////////////
        //create comments
    createComments = async(req, res, next) => {
            try {
                const { _id, comment } = req.body

                const comments = await commentSchema.create({ comment, user: req.user, post: _id })
                const post = await postSchema.findById(_id)
                post.comments.unshift(comments._id)
                await post.save()
                res.json({
                    message: "comments create succesfully"
                });
            } catch (error) {
                next(error)
                console.log(error)
            }
        }
        ///delete comment
    deleteComments = async(req, res, next) => {
        try {
            const { _id } = req.body

            const comments = await commentSchema.findById(_id)
            await postSchema.findByIdAndUpdate(comments.post, {
                $pull: {
                    comments: _id
                }
            })
            await comments.deleteOne()
            res.json({
                message: "comments deleted succesfully"
            });
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

}

module.exports = new PostCotroller()