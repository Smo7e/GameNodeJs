const useUpdateHpMobsHandler = (game) => {
    return async (req, res) => {
        return res.send(await game.updateHpMobs());
    };
};
module.exports = useUpdateHpMobsHandler;
