const useGetUserByIdHandler = (user) => {
    return async (req, res) => {
        const { id } = req.query;
        return res.send(await user.getUserById(id));
    };
};
module.exports = useGetUserByIdHandler;
