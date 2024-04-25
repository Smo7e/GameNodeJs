const useGetFriendsHandler = (lobby) => {
    return async (req, res) => {
        const { token } = req.query;

        return res.send(await lobby.getFriends(token));
    };
};
module.exports = useGetFriendsHandler;
