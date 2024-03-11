const useAddFriendHandler = (lobby) => {
    return async (req, res) => {
        const { token, id } = req.query;

        return res.send(lobby.addFriend(token, id));
    };
};
module.exports = useAddFriendHandler;
