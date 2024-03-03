const useAddGamersHandler = (lobby) => {
    return async (req, res) => {
        const { token } = req.query;
        return res.send(await lobby.addGamers(token));
    };
};
module.exports = useAddGamersHandler;
