const useGetItemsHandler = (lobby) => {
    return async (req, res) => {
        return res.send(await lobby.getItems());
    };
};
module.exports = useGetItemsHandler;
