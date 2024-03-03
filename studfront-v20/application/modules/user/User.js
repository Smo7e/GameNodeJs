const md5 = require("md5");
class User {
    constructor(answer, db) {
        this.answer = answer;
        this.db = db;
    }
    async login(login, hash, rnd) {
        const user = await this.db.getUserByLogin(login);
        if (user) {
            const hashS = md5(user.password + rnd);
            if (hash === hashS) {
                const token = md5(hash + Math.random());
                this.db.updateToken(user.id, token);
                return this.answer.good({
                    name: user.name,
                    token: token,
                });
            }
            return this.answer.bad(1012);
        }
        return this.answer.bad(1000);
    }
    async signUp(login, nickname, hash, verifyHash) {
        if (login && nickname) {
            if (hash && verifyHash && hash === verifyHash) {
                const user = await this.db.getUserByLogin(login);
                if (!user) {
                    await this.db.addUser(login, nickname, hash);
                    return this.answer.good({
                        name: nickname,
                    });
                }
                return this.answer.bad(487);
            }
            return this.answer.bad(1501);
        }
        return this.answer.bad(1001);
    }
    async logout(token) {
        const user = await this.db.getUserByToken(token);
        if (user) {
            this.db.updateToken(user.id, null);
            return this.answer.good("ok");
        }
        return this.answer.bad(455);
    }
    async getUserById(id) {
        const user = await this.db.getUserById(id);
        if (user) {
            return this.answer.good(user);
        }
        return this.answer.bad(455);
    }
    async getUserByToken(token) {
        const user = await this.db.getUserByToken(token);
        if (user) {
            return this.answer.good(user);
        }
        return this.answer.bad(455);
    }
}

module.exports = User;
