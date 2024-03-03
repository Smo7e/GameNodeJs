const useSendMessageHandler = (chat) => {
    return async (req, res) => {
        const { token, message } = req.query;
        return res.send(await chat.sendMessage(token, message));
    };
};
module.exports = useSendMessageHandler;
