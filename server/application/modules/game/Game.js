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
        this.canUpdateArrBulletFlag = true;

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

            socket.on("UPDATE_PERSON_ID", (data) => this.updatePersonId(data, socket));
            socket.on("GET_GAMER_BY_SOCKET_ID", (data) => this.getGamerBySocketId(data, socket));

            // immortality IMMORTALITY
            socket.on("IMMORTALITY", (data) => this.immortality(data, socket));
            socket.on("ONESHOT", (data) => this.oneShot(data, socket));
            socket.on("ADD_HP_GAMER", (data) => this.addHpGamer(data, socket));
            socket.on("CALCDISTANCE", (data) => this.calcDisctance(data, socket));
            socket.on("KILL_ON_R", (data) => this.killOnR(data, socket));
            socket.on("UPDATE_ARR_BULLET_TRAJECTORY", (data) => this.updateArrBulletTrajectory(data, socket));
            socket.on("CAN_UPDATE_ARR_BULLET", (data) => this.canUpdateArrBullet(data, socket));
            socket.on("POISON_TEST", (data) => this.poisonTest(data, socket));
            socket.on("STOP_BOSS", (data) => this.stopBoss(data, socket));
        });
        const { TEST } = this.mediator.getEventTypes();
        //this.mediator.subscribe(TEST, (data) => console.log(data));
    }
    stopBoss({ lobbyName, timerInTheStop }, socket) {
        if (lobbyName) {
            this.io.to(lobbyName).emit("STOP_BOSS", this.answer.good());
            setTimeout(() => {
                this.io.to(lobbyName).emit("STOP_BOSS", this.answer.good());
            }, timerInTheStop * 1000);
            return;
        }
        this.io.to(lobbyName).emit("STOP_BOSS", this.answer.bad());
    }
    canUpdateArrBullet({ lobbyName }, socket) {
        this.canUpdateArrBulletFlag = !this.canUpdateArrBulletFlag;
    }
    killOnR({ lobbyName }, socket) {
        const player = this.lobbies[lobbyName].players[socket.id];
        const mobsArr = Object.keys(this.lobbies[lobbyName].mobs);
        const x0 = player.x;
        const y0 = player.y;
        const r = 5;
        mobsArr.forEach((mobsName) => {
            const xM = this.lobbies[lobbyName].mobs[mobsName].x;
            const yM = this.lobbies[lobbyName].mobs[mobsName].y;
            if (Math.pow(xM - x0, 2) + Math.pow(yM - y0, 2) <= r * r) {
                this.lobbies[lobbyName].mobs[mobsName].hp = 0;
            }
        });
    }

    addHpGamer({ lobbyName }, socket) {
        if (lobbyName) {
            this.lobbies[lobbyName].players[socket.id].hp += 5;
            this.getGamers({ lobbyName }, socket);

            return;
        }
        this.io.to(lobbyName).emit("ADD_HP_GAMER", this.answer.bad());
    }
    calcDisctance({ mobName, lobbyName }, socket) {
        if (mobName && lobbyName) {
            const player = this.lobbies[lobbyName].players[socket.id];
            const mob = this.lobbies[lobbyName].mobs[mobName];
            const x1 = player.x;
            const y1 = player.y;
            const x2 = mob.x;
            const y2 = mob.y;

            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            this.io.to(lobbyName).emit("CALCDISTANCE", this.answer.good(distance));

            return;
        }
        this.io.to(lobbyName).emit("CALCDISTANCE", this.answer.bad());
    }
    oneShot({ mobName, lobbyName }, socket) {
        if (mobName && lobbyName) {
            this.lobbies[lobbyName].mobs[mobName].hp = 0;
            this.io.to(lobbyName).emit("ONESHOT", this.answer.good("zaebisь"));
            return;
        }
        this.io.to(lobbyName).emit("ONESHOT", this.answer.bad());
    }
    immortality({ lobbyName, mobName }, socket) {
        if (this.lobbies[lobbyName].mobs[mobName].damage) {
            this.lobbies[lobbyName].mobs[mobName].damage = 0;
            return;
        }
        this.lobbies[lobbyName].mobs[mobName].damage = 5;
    }
    updateHp({ gamerName, lobbyName, mobName }, socket) {
        const player = this.lobbies[lobbyName].players[socket.id];
        const damage = this.lobbies[lobbyName].mobs[mobName].damage;
        player.hp -= damage;
        this.getGamers({ lobbyName }, socket);
        return;
    }
    updateHpMobs({ lobbyName, mobName }, socket) {
        if (lobbyName) {
            this.lobbies[lobbyName].mobs[mobName].hp -= 5;
            this.getMobs({ lobbyName }, socket);
            return;
        }
        this.io.to(lobbyName).emit("GET_MOBS", this.answer.bad(1001));
    }
    getMobs({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_MOBS", this.answer.good(this.lobbies[lobbyName]?.mobs));
    }
    async getQuestionsProgrammer({ lobbyName }, socket) {
        this.io
            .to(lobbyName)
            .emit("GET_QUESTIONS_PROGRAMMER", this.answer.good(await this.db.getQuestionsProgrammer()));
    }
    async getQuestionsRussian({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_QUESTIONS_RUSSIAN", this.answer.good(await this.db.getQuestionsRussian()));
    }
    async getQuestionsMath({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_QUESTIONS_MATH", this.answer.good(await this.db.getQuestionsMath()));
    }

    move({ token, x, y, lobbyName }, socket) {
        if (token && `${x}` && `${y}` && lobbyName) {
            this.lobbies[lobbyName].players[socket.id].x = x;
            this.lobbies[lobbyName].players[socket.id].y = y;
            this.getGamers({ lobbyName }, socket);
            return;
        }
        this.io.to(lobbyName).emit("GET_GAMERS", this.answer.bad(1001));
        return;
    }
    async moveMobs({ x, y, lobbyName, mobName }, socket) {
        if (x && y) {
            this.lobbies[lobbyName].mobs[mobName].x = x;
            this.lobbies[lobbyName].mobs[mobName].y = y;
            this.getMobs({ lobbyName }, socket);
            return;
        }
        this.io.to(lobbyName).emit("GET_MOBS", await this.answer.bad(1001));
    }

    async getGamers({ lobbyName }, socket) {
        this.io.to(lobbyName).emit("GET_GAMERS", this.answer.good(Object.values(this.lobbies[lobbyName]?.players)));
    }

    addMobs({ token, x, y, mobName, lobbyName }, socket) {
        if (token && lobbyName) {
            const user = this.db.getUserByToken(token);
            if (user) {
                this.lobbies[lobbyName].mobs[mobName] = {
                    mobName,
                    x,
                    y,
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
                this.getQuestionsRussian({ lobbyName }, socket);
                this.getQuestionsMath({ lobbyName }, socket);

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
        this.addMobs({ token, x: 8, y: -3, mobName: "trusov", lobbyName }, socket);
        this.addMobs({ token, x: -22, y: -12, mobName: "rusanova", lobbyName }, socket);
        this.addMobs({ token, x: 22, y: 7, mobName: "golovizin", lobbyName }, socket);

        this.addGamers({ token, lobbyName, isAdmin: true }, socket);
    }

    updateArrBulletTrajectory({ lobbyName, newArrBulletTrajectory }, socket) {
        if (!this.canUpdateArrBulletFlag) return;
        this.io.to(lobbyName).emit("UPDATE_ARR_BULLET_TRAJECTORY", this.answer.good(newArrBulletTrajectory));
    }

    poisonTest({ lobbyName }, socket) {
        const player = this.lobbies[lobbyName].players[socket.id];
        let time = 0;
        const timerId = setInterval(() => {
            player.hp -= 2;
            time += 1;
            this.getGamers({ lobbyName }, socket);
            if (time === 5) {
                clearInterval(timerId);
            }
        }, 1000);
    }
}
module.exports = Game;
