const useMoveMobsHandler = (game) => {
    return async (req, res) => {
        const { x, y } = req.query;
        return res.send(await game.moveMobs(x, y));
    };
};
module.exports = useMoveMobsHandler;
