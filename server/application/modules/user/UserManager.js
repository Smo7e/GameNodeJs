const User = require("./User");

class UserManager {
    constructor(answer, db, io, mediator) {
        this.users = {};

        this.answer = answer;
        this.db = db;
        this.mediator = mediator;
        if (!io) {
            return;
        }
        this.io = io;
        io.on("connection", (socket) => {
            socket.on("LOGIN", (data) => this.login(data, socket.id));
            socket.on("SIGNUP", (data) => this.signUp(data, socket.id));
            socket.on("LOGOUT", (data) => this.logout(data, socket.id));
            socket.on("GET_FRIENDS", () => this.getFriends(socket.id));
            socket.on("ADD_FRIENDS", (data) => this.addFriend(data, socket.id));
        });
    }

    _getUserBySocketId(socketId) {
        if (socketId) {
            if (this.users[socketId]) {
                return this.users[socketId];
            }
            const user = new User(this.db, socketId);
            this.users[socketId] = user;
            return user;
        }
        return null;
    }

    async login({ login, hash, rnd }, socketId) {
        const { TEST } = this.mediator.getEventTypes();
        this.mediator.call(TEST, "оля оля");
        const user = this._getUserBySocketId(socketId);
        if (user) {
            const data = await user.login(login, hash, rnd, socketId);
            if (data) {
                this.io.to(socketId).emit("LOGIN", this.answer.good(data));
                this.io.to(socketId).emit("GET_USER", this.answer.good(data)); ////////////////////////////

                return;
            }
            this.io.to(socketId).emit("LOGIN", this.answer.bad());
            return;
        }
        this.io.to(socketId).emit("LOGIN", this.answer.bad());
    }

    async signUp({ login, nickname, hash, verifyHash }, socketId) {
        if (login && nickname) {
            if (hash && verifyHash && hash === verifyHash) {
                const user = this._getUserBySocketId(socketId);
                const data = await user.signUp(login, nickname, hash);
                if (data) {
                    this.io.to(socketId).emit("SIGNUP", this.answer.good(data));
                    return;
                }
                this.io.to(socketId).emit("SIGNUP", this.answer.bad(9999));
                return;
            }
            this.io.to(socketId).emit("SIGNUP", this.answer.bad(1501));

            return;
        }
        this.io.to(socketId).emit("SIGNUP", this.answer.bad(1001));
        return;
    }

    async logout({ token }, socketId) {
        const user = this._getUserBySocketId(socketId);
        if (user) {
            if (await user.logout(token)) {
                delete this.users[socketId];
                this.io.to(socketId).emit("LOGOUT", this.answer.good("ok"));
                return;
            }
            this.io.to(socketId).emit("LOGOUT", this.answer.bad());
            return;
        }
        this.io.to(socketId).emit("LOGOUT", this.answer.bad());
    }

    async addFriend({ token, friend_id }, socketId) {
        const friendIdNumber = parseInt(friend_id);
        if (friend_id && (await this.db.getUserById(friend_id))) {
            const user = await this.db.getUserByToken(token);
            if (user && !(friendIdNumber == user.id)) {
                const friends = await this.db.getFriends(user.id);
                const isAlreadyFriend = friends.some((friend) => friend.id === friendIdNumber);
                if (!isAlreadyFriend) {
                    await this.db.addFriend(user.id, friend_id);
                    this.io.to(socketId).emit("GET_FRIENDS", this.getFriends(socketId));
                    return;
                }
                this.io.to(socketId).emit("GET_FRIENDS", this.answer.bad(500));
                return;
            }
            this.io.to(socketId).emit("GET_FRIENDS", this.answer.bad(455));
            return;
        }
        this.io.to(socketId).emit("GET_FRIENDS", this.answer.bad(488));
    }

    async getFriends(socketId) {
        const user = await this._getUserBySocketId(socketId);
        if (user) {
            const friends = await this.db.getFriends(user.id);
            this.io.to(socketId).emit("GET_FRIENDS", this.answer.good(friends));
            return;
        }
        this.io.to(socketId).emit("GET_FRIENDS", this.answer.bad(455));
    }

    async getUserById(id, socketId) {
        const user = this._getUserBySocketId(socketId);
        if (user && user.getUserById(id)) {
            return this.answer.good(user);
        }
        return this.answer.bad(455);
    }

    async getUserByToken(token) {
        const user = this._getUserBySocketId(socketId);
        if (user && user.getUserByToken(token)) {
            return this.answer.good(user);
        }
        return this.answer.bad(455);
    }
}

module.exports = UserManager;
