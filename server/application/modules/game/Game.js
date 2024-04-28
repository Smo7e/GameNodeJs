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
            socket.on("MOVE", (data) => this.move(data));
            socket.on("MOVE_MOBS", (data) => this.moveMobs(data));
            socket.on("ADD_GAMERS", (data) => this.addGamers(data));
            socket.on("GET_GAMERS", (data) => this.getGamers(data));
            socket.on("DELETE_GAMERS", (data) => this.deleteGamers(data));
            socket.on("GET_GAMER_BY_ID", (data) => this.getGamerById(data, socket.id));
            socket.on("UPDATE_HP", (data) => this.updateHp(data));
            socket.on("UPDATE_HP_MOBS", (data) => this.updateHpMobs(data));
            socket.on("GET_MOBS", () => this.getMobs());
            socket.on("GET_QUESTIONS_PROGRAMMER", () => this.getQuestionsProgrammer());
            socket.on("UPDATE_PERSON_ID", (data) => this.updatePersonId(data));
        });
    }
    async updateHp({ gamerName }) {
        const user = await this.db.getUserByName(gamerName);
        if (user) {
            this.db.updateHp(user.id);
            this.getGamers();
            return this.answer.good("ok");
        }
        return this.answer.bad(455);
    }
    async updateHpMobs() {
        this.db.updateHpMobs();
        this.getMobs();
    }
    async getMobs() {
        this.io.emit("GET_MOBS", this.answer.good(await this.db.getMobs()));
    }
    async getQuestionsProgrammer() {
        this.io.emit("GET_QUESTIONS_PROGRAMMER", this.answer.good(await this.db.getQuestionsProgrammer()));
    }
    async move({ token, direction, x, y, status }) {
        if (token && direction && x && y && status) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.move(user.id, direction, x, y, status);
                this.getGamers();
                return;
            }
            this.io.emit("GET_GAMERS", this.answer.bad());
            return;
        }
        this.io.emit("GET_GAMERS", this.answer.bad());
        return;
    }
    async moveMobs({ x, y }) {
        if (x && y) {
            this.db.moveMobs(x, y);
            this.getMobs();
            return;
        }
        this.io.emit("GET_MOBS", await this.answer.bad());
    }

    async getGamers() {
        this.io.emit("GET_GAMERS", this.answer.good(await this.db.getGamers()));
    }
    async getGamerById({ userId }, socketId) {
        this.io.to(socketId).emit("GET_GAMER_BY_ID", this.answer.good(await this.db.getGamerById(userId)));
    }

    async addGamers({ token }) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.addGamers(user.id);
                this.getGamers();
                return;
            }
            this.io.emit("GET_GAMERS", await this.answer.bad());
            return;
        }
        this.io.emit("GET_GAMERS", await this.answer.bad());
        return;
    }
    deleteGamers() {
        this.db.deleteGamers();
        this.io.emit("DELETE_GAMERS", this.answer.good());
    }
    async updatePersonId({ token, newPersonId }) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.updatePersonId(user.id, newPersonId);
                this.getGamers();
                return;
            }
            this.io.emit("GET_GAMERS", await this.answer.bad(455));

            return;
        }
        this.io.emit("GET_GAMERS", await this.answer.bad(1001));
        return;
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
