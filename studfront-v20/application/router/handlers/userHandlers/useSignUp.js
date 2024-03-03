const useSignUpHandler = (user) => {
    return async (req, res) => {
        const { login, nickname, hash, verifyHash } = req.query;
        return res.send(await user.signUp(login, nickname, hash, verifyHash));
    };
};
module.exports = useSignUpHandler;
