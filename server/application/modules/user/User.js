const md5 = require("md5");

class User {
    constructor(db, socketId) {
        this.db = db;
        this.socketId = socketId;

        this.id;
        this.name;
        this.token;
    }

    get() {
        return {
            id: this.id,
            name: this.name,
            token: this.token,
        };
    }

    _includeData({ name, token, id }, socketId) {
        this.id = id;
        this.name = name;
        this.token = token;
        this.socketId = socketId;
    }

    async login(login, hash, rnd, socketId) {
        const user = await this.db.getUserByLogin(login);
        if (user) {
            const hashS = md5(user.password + rnd);
            if (hash === hashS) {
                const token = md5(hash + Math.random());
                this.db.updateToken(user.id, token);
                this._includeData({ name: user.name, token, id: user.id }, socketId);
                return this.get();
            }
        }
        return null;
    }

    async logout(token) {
        if (token === this.token) {
            this.db.updateToken(this.id, null);
            return true;
        }
        return false;
    }

    getById(id) {
        return this.id === id;
    }

    getUserByToken(token) {
        return this.token === token;
    }
}

module.exports = User;
