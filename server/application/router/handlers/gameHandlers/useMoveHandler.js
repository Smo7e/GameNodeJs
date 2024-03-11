const useMoveHandler = (game) => {
    return async (req, res) => {
        const { token, direction, x, y, status } = req.query;
        return res.send(await game.move(token, direction, x, y, status));
    };
};
module.exports = useMoveHandler;
