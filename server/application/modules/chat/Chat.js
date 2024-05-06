class Chat {
    constructor(answer, db, io, mediator) {
        this.answer = answer;
        this.db = db;
        this.io = io;
        this.mediator = mediator;
        if (!io) {
            return;
        }

        io.on("connection", (socket) => {
            socket.on("SEND_MESSAGE", (data) => this.sendMessage(data, socket));
        });
    }

    async sendMessage({ token, message }, socket) {
        if (token && message) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.sendMessage(user.id, message);
                this.io.emit("GET_MESSAGES", await this.getMessage());
                return;
            }
            this.io.to(socket.id).emit("SEND_MESSAGE", this.answer.bad(455));
            return;
        }
        this.io.to(socket.id).emit("SEND_MESSAGE", this.answer.bad(1001));
    }

    async getMessage() {
        return this.answer.good({
            messages: await this.db.getMessages(),
        });
    }
}
module.exports = Chat;
