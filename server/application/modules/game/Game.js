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
            socket.on("UPDATE_HP", (data) => this.updateHp(data, socket));
            socket.on("UPDATE_HP_MOBS", (data) => this.updateHpMobs(data, socket));
            socket.on("GET_MOBS", (data) => this.getMobs(data, socket));
            socket.on("GET_QUESTIONS_PROGRAMMER", () => this.getQuestionsProgrammer(socket));
            socket.on("UPDATE_PERSON_ID", (data) => this.updatePersonId(data, socket));
            socket.on("GET_GAMER_BY_SOCKET_ID", (data) => this.getGamerBySocketId(data, socket));

            // immortality IMMORTALITY
            socket.on("IMMORTALITY", (data) => this.immortality(data, socket));

            socket.on("UPDATE_ARR_BULLET_TRAJECTORY", (data) => this.updateArrBulletTrajectory(data, socket));
        });
        const { TEST } = this.mediator.getEventTypes();
        //this.mediator.subscribe(TEST, (data) => console.log(data));
    }
    immortality({ lobbyName }, socket) {
        if (this.lobbies[lobbyName].mobs[0].damage) {
            this.lobbies[lobbyName].mobs[0].damage = 0;
            return;
        }
        this.lobbies[lobbyName].mobs[0].damage = 5;
    }
    updateHp({ gamerName, lobbyName }, socket) {
        const user = this.db.getUserByName(gamerName);
        if (user) {
            const player = this.lobbies[lobbyName].players[socket.id];
            const damage = this.lobbies[lobbyName].mobs[0].damage;
            player.hp -= damage;
            this.getGamers({ lobbyName }, socket);
            return;
        }
        return;
    }
    async updateHpMobs({ lobbyName }, socket) {
        if (lobbyName) {
            this.lobbies[lobbyName].mobs[0].hp -= 5;
            this.getMobs({ lobbyName }, socket);
            return;
        }
        this.io.to(lobbyName).emit("GET_MOBS", this.answer.bad(1001));
    }
    async getMobs({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_MOBS", this.answer.good(Object.values(this.lobbies[lobbyName]?.mobs)));
    }
    async getQuestionsProgrammer({ lobbyName }, socket) {
        this.io
            .to(lobbyName)
            .emit("GET_QUESTIONS_PROGRAMMER", this.answer.good(await this.db.getQuestionsProgrammer()));
    }
    async move({ token, x, y, lobbyName }, socket) {
        if (token && `${x}` && `${y}` && lobbyName) {
            const user = await this.db.getUserByToken(token);

            if (user) {
                this.lobbies[lobbyName].players[socket.id].x = x;
                this.lobbies[lobbyName].players[socket.id].y = y;
                this.getGamers({ lobbyName }, socket);
                return;
            }
            this.io.to(lobbyName).emit("GET_GAMERS", this.answer.bad(455));
            return;
        }
        this.io.to(lobbyName).emit("GET_GAMERS", this.answer.bad(1001));
        return;
    }
    async moveMobs({ x, y, lobbyName }, socket) {
        if (x && y) {
            this.lobbies[lobbyName].mobs[0].x = x;
            this.lobbies[lobbyName].mobs[0].y = y;
            this.getMobs({ lobbyName }, socket);
            return;
        }
        this.io.to(lobbyName).emit("GET_MOBS", await this.answer.bad(1001));
    }

    async getGamers({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_GAMERS", this.answer.good(Object.values(this.lobbies[lobbyName]?.players)));
    }

    addMobs({ token, mobsId, lobbyName }, socket) {
        if (token && lobbyName) {
            const user = this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].mobs[mobsId] = {
                    id: mobsId,
                    x: 8,
                    y: -3,
                    hp: 100,
                    damage: 5,
                };
                this.getMobs({ lobbyName }, socket);
                return;
            }
            this.io.to(socket.id).emit("GET_MOBS", this.answer.bad(455));
            return;
        }
        this.io.to(socket.id).emit("GET_MOBS", this.answer.bad(1001));
        return;
    }

    async addGamers({ token, lobbyName, isAdmin = false }, socket) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                const post = !isAdmin ? `Friend-${Object.keys(this.lobbies[lobbyName].players).length}` : "Admin";
                this.lobbies[lobbyName].players[socket.id] = {
                    user_id: user.id,
                    name: user.name,
                    person_id: 0,
                    x: 0,
                    y: 0,
                    hp: 100,
                    post,
                };
                socket.join(lobbyName);
                this.getGamerBySocketId({ lobbyName }, socket);
                this.getQuestionsProgrammer({ lobbyName }, socket);
                this.getGamers({ lobbyName }, socket);

                return;
            }
            this.io.to(socket.id).emit("GET_GAMERS", await this.answer.bad(455));
            return;
        }
        this.io.to(socket.id).emit("GET_GAMERS", await this.answer.bad(1001));
        return;
    }
    getGamerBySocketId({ lobbyName }, socket) {
        this.io
            .to(socket.id)
            .emit("GET_GAMER_BY_SOCKET_ID", this.answer.good(this.lobbies[lobbyName].players[socket.id]));
    }
    deleteGamers({ lobbyName }) {
        this.io.to(lobbyName).emit("DELETE_GAMERS", this.answer.good());
    }
    async updatePersonId({ token, newPersonId, lobbyName }, socket) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].players[socket.id].person_id = newPersonId;
                this.getGamers({ lobbyName }, socket);
                this.getGamerBySocketId({ lobbyName }, socket);
                return;
            }
            this.io.to(socket.id).emit("GET_GAMERS", await this.answer.bad(455));
            return;
        }
        this.io.to(socket.id).emit("GET_GAMERS", await this.answer.bad(1001));
        return;
    }
    createLobby({ token, lobbyName }, socket) {
        this.lobbies[lobbyName] = {
            name: lobbyName,
            players: {},
            mobs: {},
            arrBulletTrajectory: [
                [999, 999, 999, 999],
                [999, 999, 999, 999],
                [999, 999, 999, 999],
            ],
        };
        this.addMobs({ token, mobsId: 0, lobbyName }, socket);
        this.addGamers({ token, lobbyName, isAdmin: true }, socket);
    }

    updateArrBulletTrajectory({ lobbyName, newArrBulletTrajectory }, socket) {
        //this.lobbies[lobbyName].arrBulletTrajectory = newArrBulletTrajectory;
        this.io.to(lobbyName).emit("UPDATE_ARR_BULLET_TRAJECTORY", this.answer.good(newArrBulletTrajectory));
    }
}
module.exports = Game;
