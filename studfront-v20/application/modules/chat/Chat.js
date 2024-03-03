const md5 = require("md5");

class Chat {
    constructor(answer, db) {
        this.answer = answer;
        this.db = db;
    }
    async sendMessage(token, message) {
        if (token && message) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.sendMessage(user.id, message);
                const hash = md5(Math.random());
                this.db.updateChatHash(hash);
                return this.answer.good("ok");
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(1001);
    }
}
module.exports = Chat;
