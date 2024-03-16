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
            this.updateHp(6);
        })();
    }

    getUserById(id) {
        return this.orm.get("users", { id });
    }

    getUserByLogin(login) {
        return this.orm.get("users", { login });
    }

    getUserByToken(token) {
        return this.orm.get("users", { token });
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

    updateChatHash(chat_hash) {
        this.orm.update("users", { chat_hash }, { id: 1 });
    }
    ///Chat///

    ///Lobby///
    async getItems() {
        const row = await this.queryInDB("SELECT * FROM items");
        return row;
    }

    async getFriends(id) {
        return this.orm.get("users", { id }, friends);
        // const row = await this.queryInDB(`SELECT 'friends' FROM 'users' WHERE 'id' = ${id};`);
        // return row;
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
        // this.queryInDB(`INSERT INTO gamers (user_id) VALUES (${id})`);
    }
    deleteGamers() {
        this.orm.delete("gamers");

        // this.queryInDB("DELETE FROM gamers");
    }
    updatePersonId(user_id, person_id) {
        this.orm.update("gamers", { person_id }, { user_id });
        // this.queryInDB(`UPDATE gamers SET person_id=${newPersonId} WHERE user_id=${id}`);
    }
    getGamerById(user_id) {
        return this.orm.get("gamers", { user_id });
        //return await this.queryInDB(`SELECT * FROM gamers WHERE user_id=${userId}`);
    }
    addInvitation(id_who, id_to_whom) {
        this.orm.insert("invitations", { id_who, id_to_whom });
        //this.queryInDB(`INSERT INTO invitations (id_who,id_to_whom) VALUES (${userId},${friendId})`);
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

        // this.queryInDB(
        //     `UPDATE gamers SET direction='${direction}', x=${x}, y=${y}, status='${status}' WHERE user_id=${userId}`
        // );
    }
    moveMobs(x, y) {
        this.orm.update("mobs", { x, y }, { id: 1 });
        //this.queryInDB(`UPDATE mobs SET x=${x}, y=${y} WHERE id=1`);
    }
    async updateHp(user_id) {
        let hp = await this.orm.get("gamers", { user_id }, "hp");
        //SELECT hp FROM gamers WHERE user_id = ${userId}
        hp = hp.hp -= 5;
        this.orm.update("gamers", { hp }, { user_id });
        //`UPDATE gamers SET hp=${hp[0].hp - 5} WHERE user_id=${userId}
    }
    async updateHpMobs() {
        let hp = await this.orm.get("mobs", { id: 1 }, "hp");
        //const hp = this.queryInDB(`SELECT hp FROM mobs WHERE id = 1`);
        hp = hp.hp -= 5;
        this.orm.update("mobs", { hp }, { id: 1 });
        //this.queryInDB(`UPDATE mobs SET hp=${hp[0].hp - 5} WHERE id=1`);
    }
    getQuestionsProgrammer() {
        return this.orm.all("questions_programmer");

        //return this.queryInDB("SELECT * FROM questions_programmer");
    }
    async getMobs() {
        return this.orm.all("mobs");
        //return await this.queryInDB("SELECT * FROM mobs");
    }

    updateGamersHash(gamers_hash) {
        this.orm.update("game", { gamers_hash }, { id: 1 });
        //this.queryInDB(`UPDATE game SET gamers_hash='${hash}' WHERE id=1`);
    }
    updateMobsHash(mobs_hash) {
        this.orm.update("game", { mobs_hash }, { id: 1 });
        //this.queryInDB(`UPDATE game SET mobs_hash='${hash}' WHERE id=1`);
    }
    getHashes() {
        return this.orm.get("game", { id: 1 });
        // this.queryInDB(`SELECT * FROM game WHERE id=1`);
    }
    updateTimestamp(update_timestamp) {
        this.orm.update("game", { update_timestamp }, { id: 1 });
        //this.queryInDB(`UPDATE game SET update_timestamp=${updateTimestamp} WHERE id=1`);
    }
}

module.exports = DB;
