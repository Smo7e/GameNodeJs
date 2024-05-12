const { Client } = require("pg");
const ORM = require("./ORM");

class DB {
    constructor({ NAME, HOST, PORT, USER, PASS }) {
        this.db = new Client({
            host: HOST,
            port: PORT,
            database: NAME,
            user: USER,
            password: PASS,
        });
        this.orm = new ORM(this.db);
        (async () => {
            await this.db.connect();
        })();
    }

    getUserById(id) {
        return this.orm.get("users", { id });
    }

    getUserByLogin(login) {
        return this.orm.get("users", { login });
    }

    async getUserByToken(token) {
        return await this.orm.get("users", { token });
    }

    // убрать
    getUserByName(name) {
        return this.orm.get("users", { name });
    }

    updateToken(id, token) {
        this.orm.update("users", { token }, { id });
    }

    addUser(login, name, password) {
        return this.orm.insert("users", { login, name, password });
    }
    ///Chat///
    sendMessage(user_id, message) {
        this.orm.insert("messages", { user_id, message, created: new Date() });
    }
    async getMessages() {
        const query = `SELECT m.message AS message, 
                        u.name AS name
                        FROM messages AS m
                        INNER JOIN users AS u
                        ON u.id = m.user_id
                        WHERE m.created >= NOW() - INTERVAL '1 day'
                        ORDER BY m.created ASC;`;
        const row = await this.db.query(query); //$this->preparationQuery($query, [])->fetchAll(PDO::FETCH_OBJ);
        return row.rows;
    }

    ///Chat///

    ///Lobby///
    async getItems() {
        const row = await this.queryInDB("SELECT * FROM items");
        return row;
    }

    async getFriends(id) {
        return this.orm.get("users", { id }, friends);
    }
    async addFriend(user_id, friend_id) {
        await this.orm.insert("friends", { user_id, friend_id });
    }
    async getFriends(user_id) {
        const query = `
            SELECT u.id, u.login, u.name, u.token
            FROM friends f
            INNER JOIN users u ON (f.user_id = $1 AND u.id = f.friend_id) OR (f.friend_id = $1 AND u.id = f.user_id)
            WHERE f.user_id = $1 OR f.friend_id = $1
        `;
        const result = await this.db.query(query, [user_id]);
        return result.rows;
    }

    ///Lobby///

    ///Game///

    getQuestionsProgrammer() {
        return this.orm.all("questions_programmer");
    }

    updateTimestamp(update_timestamp) {
        this.orm.update("game", { update_timestamp }, { id: 1 });
    }
}

module.exports = DB;
