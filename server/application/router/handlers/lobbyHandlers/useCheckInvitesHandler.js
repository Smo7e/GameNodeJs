const useCheckInvitesHandler = (lobby) => {
    return async (req, res) => {
        const { userId } = req.query;
        return res.send(await lobby.checkInvites(userId));
    };
};
module.exports = useCheckInvitesHandler;
