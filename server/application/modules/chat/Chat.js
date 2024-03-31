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
    async getMessage(token, hash) {
        if (token && hash) {
            const user = this.db.getUserByToken(token);
            if (user) {
                //return this->chat->getMessages($hash);
                const hashes = await this.db.getHashes();
                if (hashes.chat_hash === hash) {
                    return this.answer.good("ok");
                }

                const messages = await this.db.getMessages();
                return this.answer.good({
                    messages: messages,
                    hash: hashes.chat_hash,
                });
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(1001);
    }
}
module.exports = Chat;
