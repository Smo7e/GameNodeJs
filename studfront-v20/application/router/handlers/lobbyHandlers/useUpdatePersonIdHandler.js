const useUpdatePersonIdHandler = (lobby) => {
    return async (req, res) => {
        const { token, newPersonId } = req.query;
        return res.send(await lobby.updatePersonId(token, newPersonId));
    };
};
module.exports = useUpdatePersonIdHandler;
