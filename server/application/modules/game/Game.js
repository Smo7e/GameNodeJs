const md5 = require("md5");
class Game {
    constructor(answer, db, io, mediator) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        this.mediator = mediator;
        if (!io) {
            return;
        }

        this.lobbies = {};

        io.on("connection", (socket) => {
            socket.on("CREATE_LOBBY", (data) => this.createLobby(data, socket));

            socket.on("MOVE", (data) => this.move(data, socket));
            socket.on("MOVE_MOBS", (data) => this.moveMobs(data, socket));
            socket.on("ADD_GAMERS", (data) => this.addGamers(data, socket));
            socket.on("GET_GAMERS", (data) => this.getGamers(data, socket));
            socket.on("DELETE_GAMERS", (data) => this.deleteGamers(data, socket));
            socket.on("GET_GAMER_BY_ID", (data) => this.getGamerById(data, socket));
            socket.on("UPDATE_HP", (data) => this.updateHp(data, socket));
            socket.on("UPDATE_HP_MOBS", (data) => this.updateHpMobs(data, socket));
            socket.on("GET_MOBS", () => this.getMobs(socket));
            socket.on("GET_QUESTIONS_PROGRAMMER", () => this.getQuestionsProgrammer(socket));
            socket.on("UPDATE_PERSON_ID", (data) => this.updatePersonId(data, socket));
        });
        const { TEST } = this.mediator.getEventTypes();
        this.mediator.subscribe(TEST, (data) => console.log(data));
    }
    async updateHp({ gamerName }, socket) {
        const user = await this.db.getUserByName(gamerName);
        if (user) {
            this.lobbies[lobbyName].players[user.id].hp -= 5;

            this.db.updateHp(user.id);
            this.getGamers({ lobbyName }, socket);
            return this.answer.good("ok");
        }
        return this.answer.bad(455);
    }
    async updateHpMobs(socket) {
        this.db.updateHpMobs();
        this.getMobs();
    }
    async getMobs(socket) {
        this.io.emit("GET_MOBS", this.answer.good(await this.db.getMobs()));
    }
    async getQuestionsProgrammer(socket) {
        this.io.emit("GET_QUESTIONS_PROGRAMMER", this.answer.good(await this.db.getQuestionsProgrammer()));
    }
    async move({ token, direction, x, y, status, lobbyName }, socket) {
        if (token && direction && `${x}` && `${y}` && status) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].players[user.id].x = x;
                this.lobbies[lobbyName].players[user.id].y = y;

                this.db.move(user.id, direction, x, y, status);
                this.getGamers({ lobbyName }, socket);
                return;
            }
            this.io.emit("GET_GAMERS", this.answer.bad(455));
            return;
        }
        this.io.emit("GET_GAMERS", this.answer.bad(1001));
        return;
    }
    async moveMobs({ x, y }, socket) {
        if (x && y) {
            this.db.moveMobs(x, y);
            this.getMobs(socket);
            return;
        }
        this.io.emit("GET_MOBS", await this.answer.bad(1001));
    }

    async getGamers({ lobbyName }, socket) {
        //this.io.to(lobbyName).emit("GET_GAMERS", this.answer.good(await this.db.getGamers()));
        this.io.to(lobbyName).emit("GET_GAMERS", this.answer.good(Object.values(this.lobbies[lobbyName]?.players)));
    }
    async getGamerById({ userId }, socket) {
        this.io.to(socket.id).emit("GET_GAMER_BY_ID", this.answer.good(await this.db.getGamerById(userId)));
    }

    async addGamers({ token, lobbyName }, socket) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].players[user.id] = {
                    user_id: user.id,
                    name: user.name,
                    person_id: 0,
                    x: 0,
                    y: 0,
                    hp: 100,
                };
                socket.join(lobbyName);
                this.db.addGamers(user.id);
                this.getGamers({ lobbyName }, socket);
                return;
            }
            this.io.emit("GET_GAMERS", await this.answer.bad(455));
            return;
        }
        this.io.emit("GET_GAMERS", await this.answer.bad(1001));
        return;
    }
    deleteGamers(lobbyName) {
        this.db.deleteGamers();
        this.io.emit("DELETE_GAMERS", this.answer.good());
    }
    async updatePersonId({ token, newPersonId, lobbyName }, socket) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].players[user.id].person_id = newPersonId;
                this.db.updatePersonId(user.id, newPersonId);
                this.getGamers({ lobbyName }, socket);
                return;
            }
            this.io.emit("GET_GAMERS", await this.answer.bad(455));
            return;
        }
        this.io.emit("GET_GAMERS", await this.answer.bad(1001));
        return;
    }
    createLobby({ token, lobbyName }, socket) {
        this.lobbies[lobbyName] = {
            name: lobbyName,
            players: {},
        };
        this.addGamers({ token, lobbyName }, socket);
    }
}
module.exports = Game;
// пока не нужно;
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
// updateScene(updateTimestamp, updateTimeout) {
//     if (Math.floor(new Date().getTime() / 1000) - updateTimestamp >= updateTimeout) {
//         this.db.updateTimestamp(Math.floor(new Date().getTime() / 1000));
//     }
// }
