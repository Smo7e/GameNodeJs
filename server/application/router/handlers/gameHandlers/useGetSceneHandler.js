const useGetSceneHandler = (game) => {
    return async (req, res) => {
        const { token, hashGamers, hashMobs } = req.query;

        return res.send(await game.getScene(token, hashGamers, hashMobs));
    };
};
module.exports = useGetSceneHandler;
