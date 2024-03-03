const useGetMobsHandler = (game) => {
    return async (req, res) => {
        return res.send(await game.getMobs());
    };
};
module.exports = useGetMobsHandler;
