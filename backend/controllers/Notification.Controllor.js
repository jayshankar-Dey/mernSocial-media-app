const User = require('../schema/userSchema')
const Notifacition = require('../schema/notification')

class NotifacitionController {
    addNotifacition = async(req, res) => {
            const { senderId, message } = req.body;
            const Notice = await Notifacition.create({ userId: req.user, senderId, message })
            res.json({
                message: "send Succesfully",
                Notice
            });
        }
        ///get Notifacion
    getNotifacition = async(req, res) => {
            const Notice = await Notifacition.find({ senderId: req.user }).populate({
                path: "userId",
                model: "Users",
            })
            const find = await Notifacition.find({ senderId: req.user, seen: false })
            res.json({
                message: "get Succesfully",
                Notice,
                length: find.length
            });
        }
        ///seen update Notifacion
    UpdateNotifacition = async(req, res) => {
        const Notice = await Notifacition.updateMany({ senderId: req.user, seen: false }, { $set: { seen: true } })
        res.json({
            message: "get Succesfully",
            Notice
        });
    }
    deleteNotifacition = async(req, res) => {
        const { id } = req.body;
        await Notifacition.findByIdAndDelete(id)
        res.json({
            message: "delete Succesfully",
        });
    }
}
module.exports = new NotifacitionController()