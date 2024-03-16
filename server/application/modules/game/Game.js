const md5 = require("md5");
class Game {
    constructor(answer, db) {
        this.answer = answer;
        this.db = db;
    }
    async updateHp(gamerName) {
        const user = await this.db.getUserByName(gamerName);
        if (user) {
            const hash = md5(Math.random());
            this.db.updateGamersHash(hash);
            this.db.updateHp(user.id);
            return this.answer.good("ok");
        }
        return this.answer.bad(455);
    }
    updateHpMobs() {
        const hash = md5(Math.random());
        this.db.updateMobsHash(hash);
        this.db.updateHpMobs();
        return this.answer.good("ok");
    }
    async getMobs() {
        return this.answer.good(await this.db.getMobs());
    }
    async getQuestionsProgrammer() {
        return this.answer.good(await this.db.getQuestionsProgrammer());
    }
    async move(token, direction, x, y, status) {
        if (token && direction && x && y && status) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                this.db.move(user.id, direction, x, y, status);
                const hash = md5(Math.random());
                this.db.updateGamersHash(hash);
                return this.answer.good("ok");
            }
            return this.answer.bad(455);
        }
        return this, this.answer.bad(1001);
    }
    moveMobs(x, y) {
        if (x && y) {
            this.db.moveMobs(x, y);
            const hash = md5(Math.random());
            this.db.updateMobsHash(hash);
            return this.answer.good("ok");
        }
        return this, this.answer.bad(1001);
    }
    async getScene(token, hashGamers, hashMobs) {
        const hashItems = true;
        const hashMap = true;
        if (token && hashGamers && hashItems && hashMobs && hashMap) {
            const user = await this.db.getUserByToken(token);
            if (user) {
                const result = {
                    gamers: null,
                    items: null,
                    mobs: null,
                    map: null,
                };
                const hashes = await this.db.getHashes();

                this.updateScene(hashes.update_timestamp, hashes.update_timeout);
                // проверяем хеш по игрокам
                if (hashes.gamers_hash !== hashGamers) {
                    result.gamers = await this.db.getGamers(user.id);
                    result.hashGamers = hashes.gamers_hash;
                }

                // проверяем хеш по предметам
                if (hashes.items_hash !== hashItems) {
                    // result.items = await this.db.getItems(user.id);
                    // result.hashItems = hashes.items_hash;
                }

                if (hashes.mobs_hash !== hashMobs) {
                    result.mobs = await this.db.getMobs();
                    result.hashMobs = hashes.mobs_hash;
                }

                // проверяем хеш по карте
                //...
                return this.answer.good(result);
            }
            return this.answer.bad(455);
        }
        return this.answer.bad(1001);
    }
    updateScene(updateTimestamp, updateTimeout) {
        if (Math.floor(new Date().getTime() / 1000) - updateTimestamp >= updateTimeout) {
            this.db.updateTimestamp(Math.floor(new Date().getTime() / 1000));

            // удалить мёртвых игроков
            // если у игрока статус "умер" - удалить его из БД

            // передвинуть мобов
            // передвинуть моба к ближайшему игроку
            // или воспользоваться либой easystar

            // переместить пули мобов
            // переместить пули мобов

            // воткнуть пули мобов в стены или в игроков
            // если пуля куда-нибудь воткнулась, посчитать урон окружающим

            // нанести урон игрокам
            // из ХП игрока вычесть урон в зависимости от расстояния попадания пули

            // стукнувшиеся пули мобов удалить
            //...

            // умершему игроку выставить статус "умер"
            // выставить игроку статус, чтобы на него могли отреагировать клиенты

            // обновить хеши игроков, мобов и пуль
        }
    }
}
module.exports = Game;
