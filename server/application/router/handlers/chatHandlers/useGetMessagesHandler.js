const useGetMessagesHandler = (chat) => {
    return async (req, res) => {
        const { token, hash } = req.query;
        return res.send(await chat.getMessage(token, hash));
    };
};
module.exports = useGetMessagesHandler;
