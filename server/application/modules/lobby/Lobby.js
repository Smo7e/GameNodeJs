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

    async addFriend(token, friend_id) {
        const friendIdNumber = parseInt(friend_id);
        if (friend_id && (await this.db.getUserById(friend_id))) {
            const user = await this.db.getUserByToken(token);
            if (user && !(friendIdNumber == user.id)) {
                const friends = await this.db.getFriends(user.id);
                if (!friends.includes(friendIdNumber)) {
                    await this.db.addFriend(user.id, friend_id);
                    return this.answer.good("ok");
                }
                return this.answer.bad(500);
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(488);
    }

    async getFriends(token) {
        const user = await this.db.getUserByToken(token);
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
    addInvitation(userId, friendId) {
        this.db.addInvitation(userId, friendId);
        return this.answer.good("ok");
    }
    async checkInvites(userId) {
        return this.answer.good(await this.db.checkInvites(userId));
    }
}
module.exports = Lobby;
