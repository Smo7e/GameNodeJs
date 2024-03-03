const useLogoutHandler = (user) => {
    return async (req, res) => {
        const { token } = req.query;
        return res.send(await user.logout(token));
    };
};
module.exports = useLogoutHandler;
