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
        (async () => {
            await this.db.connect();
            this.orm = new ORM(this.db);
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

    updateChatHash(chat_hash) {
        this.orm.update("game", { chat_hash }, { id: 1 });
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
    async getGamers() {
        const result = await this.db.query(
            `SELECT u.name AS name,
             g.person_id AS person_id,
             g.status AS status,
             g.x AS x,
             g.y AS y,
             g.direction AS direction,
             g.hp as hp
             FROM gamers AS g
             INNER JOIN users AS u
             ON u.id=g.user_id`
        );
        return result.rows;
    }

    addGamers(user_id) {
        this.orm.insert("gamers", { user_id });
    }
    deleteGamers() {
        this.orm.delete("gamers");
    }
    updatePersonId(user_id, person_id) {
        this.orm.update("gamers", { person_id }, { user_id });
    }
    getGamerById(user_id) {
        return this.orm.get("gamers", { user_id });
    }
    addInvitation(id_who, id_to_whom) {
        this.orm.insert("invitations", { id_who, id_to_whom });
    }
    async checkInvites(id_to_whom) {
        //console.log(await this.orm.get("invitations", { id_to_whom }, "id_who"));
        return await this.orm.all("invitations", { id_to_whom }, "id_who", true);
        //return this.queryInDB(`SELECT id_who FROM invitations WHERE id_to_whom=${userId}`);
    }

    ///Lobby///

    ///Game///
    move(user_id, direction, x, y, status) {
        this.orm.update("gamers", { direction, x, y, status }, { user_id });
    }
    moveMobs(x, y) {
        this.orm.update("mobs", { x, y }, { id: 1 });
    }
    async updateHp(user_id) {
        let hp = await this.orm.get("gamers", { user_id }, "hp");
        hp = hp.hp -= 5;
        this.orm.update("gamers", { hp }, { user_id });
    }
    async updateHpMobs() {
        let hp = await this.orm.get("mobs", { id: 1 }, "hp");
        hp = hp.hp -= 5;
        this.orm.update("mobs", { hp }, { id: 1 });
    }
    getQuestionsProgrammer() {
        return this.orm.all("questions_programmer");
    }
    async getMobs() {
        return this.orm.all("mobs");
        //return await this.queryInDB("SELECT * FROM mobs");
    }

    updateGamersHash(gamers_hash) {
        this.orm.update("game", { gamers_hash }, { id: 1 });
    }
    updateMobsHash(mobs_hash) {
        this.orm.update("game", { mobs_hash }, { id: 1 });
    }
    getHashes() {
        return this.orm.get("game", { id: 1 });
    }
    updateTimestamp(update_timestamp) {
        this.orm.update("game", { update_timestamp }, { id: 1 });
    }
}

module.exports = DB;
