const Chats = require("../schema/ChatSchema");
const Conversations = require("../schema/Conversation.schema");

class ChatController {

    createChat = async(req, res, next) => {
        try {
            const { message, reciverID } = req.body
            const senderID = req.user
            const id = [senderID, reciverID]
            const findConvirsation = await Conversations.findOne({
                members: {
                    $all: id
                }
            })
            if (!findConvirsation) {
                await Conversations.create({ members: [senderID, reciverID] })
            }
            const chats = await Chats.create({ senderID, reciverID, message })
            findConvirsation.chat.push(chats._id)
            await findConvirsation.save()
            res.json({
                senderID,
                reciverID,
                message,
                findConvirsation
            });
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    getChat = async(req, res, next) => {
        try {
            const reciverID = req.params.id
            const senderID = req.user
            const id = [senderID, reciverID]
            if (reciverID) {
                const Convirsation = await Conversations.findOne({
                    members: {
                        $all: id
                    }
                }, { chat: 1 }).populate({
                    path: "chat",
                    model: "Chats"
                })

                if (Convirsation) {
                    res.json({
                        Convirsation

                    });
                } else {
                    res.json({
                        Convirsation: []
                    });
                }

            }
        } catch (error) {
            next(error)
            console.log(error)
        }
    }


}


module.exports = new ChatController()