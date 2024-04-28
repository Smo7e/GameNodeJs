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
            socket.on("ADD_INVITES", (data) => this.addInvitation(data, socket.id));
        });
    }
    async getItems() {
        const item = await this.db.getItems();
        if (item) {
            return this.answer.good(item);
        }
        return this.answer.bad(405);
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
    async addInvitation({ userId, friendId }) {
        await this.db.addInvitation(userId, friendId);
        this.io.emit("GET_INVITES", this.answer.good(await this.db.checkInvites(userId)));
    }
    async checkInvites({ userId }) {
        this.io.emit("GET_INVITES", this.answer.good(await this.db.checkInvites(userId)));
    }
}
module.exports = Lobby;
