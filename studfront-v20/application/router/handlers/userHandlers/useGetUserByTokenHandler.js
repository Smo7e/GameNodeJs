const useGetUserByTokenHandler = (user) => {
    return async (req, res) => {
        const { token } = req.query;
        return res.send(await user.getUserByToken(token));
    };
};
module.exports = useGetUserByTokenHandler;
