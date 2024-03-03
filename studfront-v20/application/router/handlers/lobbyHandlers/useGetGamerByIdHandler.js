const useGetGamerByIdHandler = (lobby) => {
    return async (req, res) => {
        const { userId } = req.query;

        return res.send(await lobby.getGamerById(userId));
    };
};
module.exports = useGetGamerByIdHandler;
