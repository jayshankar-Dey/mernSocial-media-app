const express = require('express');
const authController = require('../controllers/auth.controller');
const valide = require('../middlewares/Validate');
const registerSchema = require('../validation/register.Validation');
const isauth = require('../middlewares/isauth.Middleware');
const router = express.Router();
const singleUplode = require('../middlewares/SingleUplode');
const postController = require('../controllers/post.controller');
const NotificationControllor = require('../controllers/Notification.Controllor');
const ChatControllor = require('../controllers/Chat.controllor');
router.post('/register', valide(registerSchema), authController.register)

router.post('/login', authController.login)

router.put('/profile/update', isauth, singleUplode, authController.update)

router.get('/profile/:id?', isauth, authController.getProfile)

router.get('/users', isauth, authController.getAllUsers)

router.get('/getusers', isauth, authController.getUserData)

router.post('/request', isauth, authController.request)

router.post('/unrequest', isauth, authController.unrequest)

router.get('/request/users', isauth, authController.showRequestedUser)

router.post('/confirm/request', isauth, authController.Confirm_request)

router.post('/Cancle/request', isauth, authController.calclerequest)
router.get('/friends', isauth, authController.getFrinde_User)
    ////post routes///////////////////////////////////////////////////////////
router.post('/create/post', isauth, singleUplode, postController.createPost)

router.get('/get/post/:id?', isauth, postController.getAllPost)

router.put('/update/post/:id', isauth, singleUplode, postController.edditPost)

router.delete('/delete/post/:id', isauth, postController.deletePost)

router.post('/like/post', isauth, postController.likepost)

router.post('/unlike/post', isauth, postController.unlikepost)
    /////////////////////////comments//////////////////
router.post('/comment/post', isauth, postController.createComments)
router.post('/delete/comments', isauth, postController.deleteComments)
module.exports = router

////Notification//////////////////////////

router.post('/add/Notifacion', isauth, NotificationControllor.addNotifacition)

router.get('/get/Notifacion', isauth, NotificationControllor.getNotifacition)

router.post('/seen/Notifacion', isauth, NotificationControllor.UpdateNotifacition)
router.post('/delete/Notifacion', isauth, NotificationControllor.deleteNotifacition)

////chat////////////////////
router.post('/create/chat', isauth, ChatControllor.createChat)
router.get('/get/chat/:id', isauth, ChatControllor.getChat)