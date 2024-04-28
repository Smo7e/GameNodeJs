class Lobby {
    constructor(answer, db, io) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        if (!io) {
            return;
        }

        io.on("connection", (socket) => {
            socket.on("GET_ITEMS", () => this.getItems(socket.id));
            socket.on("ADD_INVITES", (data) => this.addInvitation(data, socket.id));
            socket.on("GET_INVITES", (data) => this.checkInvites(data, socket.id));
        });
    }
    async getItems() {
        const item = await this.db.getItems();
        if (item) {
            this.io.emit("GET_ITEMS", this.answer.good(item));
            return;
        }
        this.io.emit("GET_ITEMS", this.answer.bad(405));
        return;
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
