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
    // addFriend(token, id) {
    //     if (token && id) {
    //         const user = this.db.getUserByToken(token);
    //         if (user) {
    //             const userFriend = this.db.getFriends(user.id);
    //             if (userFriend) {
    //                 const friends = json_decode(user["friends"], true);
    //                 if (!in_array(friendId, friends)) {
    //                     const friend = this.db.getUserById(friendId);
    //                     if (friend) {
    //                         this.db.addFriend(user.id, friend.id, friends);
    //                         return this.answer.good("ok");
    //                     }
    //                     return this.answer.bad(488);
    //                 }
    //                 return this.answer.bad(500);
    //             }
    //             return this.answer.bad(499);
    //         }
    //         return this.answer.bad(455);
    //     }
    //     return this.answer.bad(1001);
    // }

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
