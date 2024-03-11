const useLoginHandler = (user) => {
    return async (req, res) => {
        const { login, hash, rnd } = req.query;
        return res.send(await user.login(login, hash, rnd));
    };
};
module.exports = useLoginHandler;
