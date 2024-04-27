class Lobby {
    constructor(answer, db, io) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        if (!io) {
            return;
        }

        io.on("connection", (socket) => {
            socket.on("GET_INVITES", (data) => this.checkInvites(data, socket.id));
            socket.on("ADD_INVITES", (data) => this.checkInvites(data, socket.id));
        });
    }
    async getItems() {
        const item = await this.db.getItems();
        if (item) {
            return this.answer.good(item);
        }
        return this.answer.bad(405);
    }

    async addFriend(token, friend_id) {
        const friendIdNumber = parseInt(friend_id);
        if (friend_id && (await this.db.getUserById(friend_id))) {
            const user = await this.db.getUserByToken(token);
            if (user && !(friendIdNumber == user.id)) {
                const friends = await this.db.getFriends(user.id);
                const isAlreadyFriend = friends.some((friend) => friend.id === friendIdNumber);
                if (!isAlreadyFriend) {
                    await this.db.addFriend(user.id, friend_id);
                    return this.answer.good("ok");
                }
                return this.answer.bad(500);
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(488);
    }

    async getFriends(soket) {
        const user = await this.db.getUserById(soket.id);

        if (user) {
            const friends = await this.db.getFriends(user.id);
            return this.answer.good(friends);
        }
        return this.answer.bad(455);
    }

    async getGamers() {
        return this.answer.good(await this.db.getGamers());
    }

    async addGamers(token) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.addGamers(user.id);
                return this.answer.good("ok");
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(1001);
    }
    async deleteGamers() {
        this.db.deleteGamers();
        return this.answer.good("ok");
    }
    async updatePersonId(token, newPersonId) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.updatePersonId(user.id, newPersonId);
                return this.answer.good("ok");
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(1001);
    }
    async getGamerById(userId) {
        return this.answer.good(await this.db.getGamerById(userId));
    }
    async addInvitation(userId, friendId) {
        await this.db.addInvitation(userId, friendId);
        this.io.emit("GET_INVITES", await this.answer.good(this.db.checkInvites(userId)));
    }
    async checkInvites({ userId }, soketId) {
        this.io.to(soketId).emit("GET_INVITES", await this.answer.good(this.db.checkInvites(userId)));
        //return this.answer.good(await this.db.checkInvites(userId));
    }
}
module.exports = Lobby;
