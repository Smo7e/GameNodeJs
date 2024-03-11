const useGetGamersHandler = (lobby) => {
    return async (req, res) => {
        return res.send(await lobby.getGamers());
    };
};
module.exports = useGetGamersHandler;
