const useUpdateHpHandler = (game) => {
    return async (req, res) => {
        const { gamerName } = req.query;
        return res.send(await game.updateHp(gamerName));
    };
};
module.exports = useUpdateHpHandler;
