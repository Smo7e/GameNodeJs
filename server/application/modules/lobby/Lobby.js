class Lobby {
    constructor(answer, db, io, mediator) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        this.mediator = mediator;
        if (!io) {
            return;
        }
        this.invites = {};

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

    async addInvitation({ userId, friendId, lobbyName }) {
        if (!this.invites[friendId]) {
            this.invites[friendId] = {
                friendsId: [],
                lobbyName: null,
            };
        }
        this.invites[friendId].friendsId.push(userId);
        this.invites[friendId].lobbyName = lobbyName;
        this.io.emit("GET_INVITES", this.answer.good(this.invites[friendId]));
    }
    async checkInvites({ userId }) {
        this.io.emit("GET_INVITES", this.answer.good(this.invites[userId]));
    }
}
module.exports = Lobby;
