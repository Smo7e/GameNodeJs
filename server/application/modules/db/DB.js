const { Client } = require('pg');

class DB {
    constructor({ NAME, HOST, PORT, USER, PASS, }) {
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

    async all(query, values = []) {
        const res = await this.db.query(query, values);
        return res.rows ? res.rows : [];
    }

    update(query, values = []) {
        this.db.query(query, values);
    }

    getUserById(id) { 
        return this.orm.get('users', { id });
    }

    getUserByLogin(login) {
        return this.orm.get('users', { login });
    }

    getUserByToken(token) {
        return this.orm.get('users', { token });
    }

    // убрать
    getUserByName(name) {
        return this.orm.get('users', { name });
    }

    updateToken(user_id, token) {
        return this.queryInDB(`UPDATE users SET token='${token}' WHERE id=${user_id}`);
    }

    addUser(login, nickname, hash) {
        return this.queryInDB(
            `INSERT INTO users (login, name, password) VALUES ('${login}', '${nickname}', '${hash}')`
        );
    }
    ///Chat///
    sendMessage(userId, message) {
        this.queryInDB(
            `INSERT INTO messages (user_id, message, created) VALUES (${userId}, '${message}', '${new Date()}')`
        ); ////////////////////////////////////////
    }

    updateChatHash(hash) {
        this.queryInDB(`UPDATE game SET chat_hash='${hash}' WHERE id=1`);
    }
    ///Chat///

    ///Lobby///
    async getItems() {
        const row = await this.queryInDB("SELECT * FROM items");
        return row;
    }

    async getFriends(id) {
        const row = await this.queryInDB(`SELECT 'friends' FROM 'users' WHERE 'id' = ${id};`);
        return row;
    }
    async getGamers() {
        return await this.queryInDB(
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
    }

    addGamers(id) {
        this.queryInDB(`INSERT INTO gamers (user_id) VALUES (${id})`);
    }
    deleteGamers() {
        this.queryInDB("DELETE FROM gamers");
    }
    updatePersonId(id, newPersonId) {
        this.queryInDB(`UPDATE gamers SET person_id=${newPersonId} WHERE user_id=${id}`);
    }
    async getGamerById(userId) {
        return await this.queryInDB(`SELECT * FROM gamers WHERE user_id=${userId}`);
    }
    addInvitation(userId, friendId) {
        this.queryInDB(`INSERT INTO invitations (id_who,id_to_whom) VALUES (${userId},${friendId})`);
    }
    async checkInvites(userId) {
        return await this.queryInDB(`SELECT id_who FROM invitations WHERE id_to_whom=${userId}`);
    }

    ///Lobby///

    ///Game///
    move(userId, direction, x, y, status) {
        this.queryInDB(
            `UPDATE gamers SET direction='${direction}', x=${x}, y=${y}, status='${status}' WHERE user_id=${userId}`
        );
    }
    moveMobs(x, y) {
        this.queryInDB(`UPDATE mobs SET x=${x}, y=${y} WHERE id=1`);
    }
    async updateHp(userId) {
        const hp = await this.queryInDB(`SELECT hp FROM gamers WHERE user_id = ${userId}`);
        await this.queryInDB(`UPDATE gamers SET hp=${hp[0].hp - 5} WHERE user_id=${userId}`);
    }
    async updateHpMobs() {
        const hp = await this.queryInDB(`SELECT hp FROM mobs WHERE id = 1`);
        await this.queryInDB(`UPDATE mobs SET hp=${hp[0].hp - 5} WHERE id=1`);
    }
    async getQuestionsProgrammer() {
        return await this.queryInDB("SELECT * FROM questions_programmer");
    }
    async getMobs() {
        return await this.queryInDB("SELECT * FROM mobs");
    }

    updateGamersHash(hash) {
        this.queryInDB(`UPDATE game SET gamers_hash='${hash}' WHERE id=1`);
    }
    updateMobsHash(hash) {
        this.queryInDB(`UPDATE game SET mobs_hash='${hash}' WHERE id=1`);
    }
    async getHashes() {
        return await this.queryInDB(`SELECT * FROM game WHERE id=1`);
    }
    updateTimestamp(updateTimestamp) {
        this.queryInDB(`UPDATE game SET update_timestamp=${updateTimestamp} WHERE id=1`);
    }
}

module.exports = DB;
