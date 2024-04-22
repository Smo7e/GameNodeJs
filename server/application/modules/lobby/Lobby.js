class Lobby {
    constructor(answer, db) {
        this.answer = answer;
        this.db = db;
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
    async getGamers() {
        return this.answer.good(await this.db.getGamers());
    }

    async addGamers(token) {
        if (token) {
            const user = await this.db.getUserByToken(token);
            console.log(user);
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
    addInvitation(userId, friendId) {
        this.db.addInvitation(userId, friendId);
        return this.answer.good("ok");
    }
    async checkInvites(userId) {
        return this.answer.good(await this.db.checkInvites(userId));
    }
}
module.exports = Lobby;
