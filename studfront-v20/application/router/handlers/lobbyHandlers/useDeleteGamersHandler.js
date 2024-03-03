const useDeleteGamersHandler = (lobby) => {
    return async (req, res) => {
        return res.send(await lobby.deleteGamers());
    };
};
module.exports = useDeleteGamersHandler;
