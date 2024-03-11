const useGetQuestionsProgrammerHandler = (game) => {
    return async (req, res) => {
        return res.send(await game.getQuestionsProgrammer());
    };
};
module.exports = useGetQuestionsProgrammerHandler;
