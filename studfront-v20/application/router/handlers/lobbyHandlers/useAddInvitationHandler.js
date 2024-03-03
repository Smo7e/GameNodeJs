const useAddInvitationHandler = (lobby) => {
    return async (req, res) => {
        const { userId, friendId } = req.query;
        return res.send(lobby.addInvitation(userId, friendId));
    };
};
module.exports = useAddInvitationHandler;
