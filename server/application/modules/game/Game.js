const md5 = require("md5");
class Game {
    constructor(answer, db, io) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        if (!io) {
            return;
        }

        io.on("connection", (socket) => {
            socket.on("MOVE_MOBS", (data) => this.moveMobs(data));
            socket.on("ADD_GAMERS", (data) => this.addGamers(data));
            socket.on("DELETE_GAMERS", (data) => this.deleteGamers(data));
        });
    }
    async updateHp(gamerName) {
        const user = await this.db.getUserByName(gamerName);
        if (user) {
            this.db.updateHp(user.id); ///
            this.io.emit("GET_GAMERS", await this.db.getGamers());
            return this.answer.good("ok");
        }
        return this.answer.bad(455);
    }
    async updateHpMobs() {
        this.db.updateHpMobs();
        this.io.emit("GET_MOBS", await this.db.getMobs());
        return this.answer.good("ok");
    }
    async getMobs() {
        return await this.db.getMobs();
    }
    async getQuestionsProgrammer() {
        return this.answer.good(await this.db.getQuestionsProgrammer());
    }
    async move(token, direction, x, y, status) {
        if (token && direction && x && y && status) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.move(user.id, direction, x, y, status);
                this.io.emit("GET_GAMERS", await this.db.getGamers());
                return;
            }
            return this.answer.bad(2);
        }
        return this.answer.bad(1);
    }
    async moveMobs({ x, y }) {
        if (x && y) {
            this.db.moveMobs(x, y);
            this.io.emit("GET_MOBS", await this.getMobs());
            return;
        }
        this.io.emit("GET_MOBS", await this.answer.bad(3));
    }

    async getGamers() {
        return this.answer.good(await this.db.getGamers());
    }

    async addGamers({ token }) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            console.log(user);
            if (user) {
                this.db.addGamers(user.id);
                this.io.emit("GET_GAMERS", await this.db.getGamers());
                return;
            }
            this.io.emit("GET_GAMERS", await this.answer.bad(4));
            return;
        }
        this.io.emit("GET_GAMERS", await this.answer.bad(5));
        return;
    }
    async deleteGamers() {
        this.db.deleteGamers();
        return this.answer.good("ok");
    }
    // async getScene(token, hashGamers, hashMobs) {
    //     const hashItems = true;
    //     const hashMap = true;
    //     if (token && hashGamers && hashItems && hashMobs && hashMap) {
    //         const user = await this.db.getUserByToken(token);
    //         if (user) {
    //             const result = {
    //                 gamers: null,
    //                 items: null,
    //                 mobs: null,
    //                 map: null,
    //             };
    //             const hashes = await this.db.getHashes();

    //             this.updateScene(hashes.update_timestamp, hashes.update_timeout);
    //             // проверяем хеш по игрокам
    //             if (hashes.gamers_hash !== hashGamers) {
    //                 result.gamers = await this.db.getGamers(user.id);
    //                 result.hashGamers = hashes.gamers_hash;
    //             }

    //             // проверяем хеш по предметам
    //             if (hashes.items_hash !== hashItems) {
    //                 // result.items = await this.db.getItems(user.id);
    //                 // result.hashItems = hashes.items_hash;
    //             }

    //             if (hashes.mobs_hash !== hashMobs) {
    //                 result.mobs = await this.db.getMobs();
    //                 result.hashMobs = hashes.mobs_hash;
    //             }

    //             // проверяем хеш по карте
    //             //...
    //             return this.answer.good(result);
    //         }
    //         return this.answer.bad(455);
    //     }
    //     return this.answer.bad(1001);
    // }
    updateScene(updateTimestamp, updateTimeout) {
        if (Math.floor(new Date().getTime() / 1000) - updateTimestamp >= updateTimeout) {
            this.db.updateTimestamp(Math.floor(new Date().getTime() / 1000));
        }
    }
}
module.exports = Game;
