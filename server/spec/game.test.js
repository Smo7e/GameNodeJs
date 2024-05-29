const md5 = require("md5");
const DB = require("../application/modules/db/DB");
const Mediator = require("../application/modules/mediator/Mediator");
const UserManager = require("../application/modules/user/UserManager");
const Answer = require("../application/router/Answer");
const CONFIG = require("../config");
const express = require("express");
const Game = require("../application/modules/game/Game");
const app = express();

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});
const { DATABASE, MEDIATOR } = CONFIG;

const db = new DB(DATABASE);
const answer = new Answer();
const mediator = new Mediator(MEDIATOR);

const user = new UserManager(answer, db, io, mediator);
const game = new Game(answer, db, io, mediator);

describe("Проверка файла Game", () => {
    const lobbyName = "testLobbyName";
    const socket1User = {
        join: () => {},
        id: "testSocket1",
    };
    const socket2User = {
        join: () => {},
        id: "testSocket2",
    };
    const socket3User = {
        join: () => {},
        id: "testSocket3",
    };
    let user1;
    let user2;
    let user3;

    test("Проверка создания лобби и добавление геймера vasya ", async () => {
        await user.login({ login: "vasya", hash: "7c95e34107e38966f4ad80eea4d93f33", rnd: 1001 }, socket1User.id);
        await user.login({ login: "123", hash: "5beaa28fd616709c9a36e0adb14554ea", rnd: 1001 }, socket2User.id);
        await user.login({ login: "masha", hash: "e348505c440ad92d8945681b6594e844", rnd: 1001 }, socket3User.id);
        user1 = user.users[socket1User.id];
        user2 = user.users[socket2User.id];
        user3 = user.users[socket3User.id];

        game.createLobby({ token: user1.token, lobbyName: lobbyName }, socket1User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;
        expect(game.lobbies).toEqual({
            testLobbyName: {
                name: "testLobbyName",
                players: {
                    testSocket1: {
                        user_id: 1,
                        name: "Vasya Ivanoff",
                        person_id: 0,
                        x: 0,
                        y: 0,
                        hp: 100,
                        post: "Admin",
                    },
                },
                mobs: {
                    trusov: { mobName: "trusov", x: 8, y: -3, hp: 100, damage: 5 },
                    rusanova: { mobName: "rusanova", x: -22, y: -12, hp: 100, damage: 5 },
                    golovizin: { mobName: "golovizin", x: 22, y: 7, hp: 100, damage: 5 },
                },
                arrBulletTrajectory: [
                    [999, 999, 999, 999],
                    [999, 999, 999, 999],
                    [999, 999, 999, 999],
                ],
            },
        });
    });
    test("Проверка добавления геймера 123", async () => {
        game.addGamers({ token: user2.token, lobbyName }, socket2User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].players).toEqual({
            testSocket1: {
                hp: 100,
                name: "Vasya Ivanoff",
                person_id: 0,
                post: "Admin",
                user_id: 1,
                x: 0,
                y: 0,
            },
            testSocket2: {
                hp: 100,
                name: "123",
                person_id: 0,
                post: "Friend-1",
                user_id: 6,
                x: 0,
                y: 0,
            },
        });
    });
    test("Проверка добавления геймера masha", async () => {
        game.addGamers({ token: user3.token, lobbyName }, socket3User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].players).toEqual({
            testSocket1: {
                hp: 100,
                name: "Vasya Ivanoff",
                person_id: 0,
                post: "Admin",
                user_id: 1,
                x: 0,
                y: 0,
            },
            testSocket2: {
                hp: 100,
                name: "123",
                person_id: 0,
                post: "Friend-1",
                user_id: 6,
                x: 0,
                y: 0,
            },
            testSocket3: {
                hp: 100,
                name: "Masha",
                person_id: 0,
                post: "Friend-2",
                user_id: 3,
                x: 0,
                y: 0,
            },
        });
    });

    test("Проверка изменения персон у 3ех геймеров", async () => {
        game.updatePersonId({ token: user1.token, newPersonId: 1, lobbyName }, socket1User);
        game.updatePersonId({ token: user2.token, newPersonId: 1, lobbyName }, socket2User);
        game.updatePersonId({ token: user3.token, newPersonId: 1, lobbyName }, socket3User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].players[socket1User.id].person_id).toEqual(1);
        expect(game.lobbies[lobbyName].players[socket2User.id].person_id).toEqual(1);
        expect(game.lobbies[lobbyName].players[socket3User.id].person_id).toEqual(1);
    });

    test("Проверка перемещения у 3ех геймеров", async () => {
        game.move({ token: user1.token, x: 100, y: 100, lobbyName }, socket1User);
        game.move({ token: user2.token, x: 100, y: 100, lobbyName }, socket2User);
        game.move({ token: user3.token, x: 100, y: 100, lobbyName }, socket3User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].players[socket1User.id].x).toEqual(100);
        expect(game.lobbies[lobbyName].players[socket1User.id].y).toEqual(100);

        expect(game.lobbies[lobbyName].players[socket2User.id].x).toEqual(100);
        expect(game.lobbies[lobbyName].players[socket2User.id].y).toEqual(100);

        expect(game.lobbies[lobbyName].players[socket3User.id].x).toEqual(100);
        expect(game.lobbies[lobbyName].players[socket3User.id].y).toEqual(100);
    });

    test("Проверка перемещения у 3ех мобов", async () => {
        game.moveMobs({ x: 100, y: 100, mobName: "golovizin", lobbyName }, socket1User);
        game.moveMobs({ x: 100, y: 100, mobName: "rusanova", lobbyName }, socket1User);
        game.moveMobs({ x: 100, y: 100, mobName: "trusov", lobbyName }, socket1User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].mobs["golovizin"].x).toEqual(100);
        expect(game.lobbies[lobbyName].mobs["golovizin"].y).toEqual(100);

        expect(game.lobbies[lobbyName].mobs["rusanova"].x).toEqual(100);
        expect(game.lobbies[lobbyName].mobs["rusanova"].y).toEqual(100);

        expect(game.lobbies[lobbyName].mobs["trusov"].x).toEqual(100);
        expect(game.lobbies[lobbyName].mobs["trusov"].y).toEqual(100);
    });

    test("Проверка нанесения урона 3ем геймерам", async () => {
        game.updateHp({ gamerName: null, lobbyName, mobName: "golovizin" }, socket1User);
        game.updateHp({ gamerName: null, lobbyName, mobName: "golovizin" }, socket2User);
        game.updateHp({ gamerName: null, lobbyName, mobName: "golovizin" }, socket3User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].players[socket1User.id].hp).toEqual(95);
        expect(game.lobbies[lobbyName].players[socket2User.id].hp).toEqual(95);
        expect(game.lobbies[lobbyName].players[socket3User.id].hp).toEqual(95);
    });

    test("Проверка нанесения урона 3ем боссам", async () => {
        game.updateHpMobs({ lobbyName, mobName: "golovizin" }, socket1User);
        game.updateHpMobs({ lobbyName, mobName: "trusov" }, socket1User);
        game.updateHpMobs({ lobbyName, mobName: "rusanova" }, socket1User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 1000));
        const result = await waitTime;

        expect(game.lobbies[lobbyName].mobs["trusov"].hp).toEqual(95);
        expect(game.lobbies[lobbyName].mobs["rusanova"].hp).toEqual(95);
        expect(game.lobbies[lobbyName].mobs["golovizin"].hp).toEqual(95);
    });
    //immortality

    test("Проверка метода immortality", async () => {
        game.immortality({ lobbyName, mobName: "golovizin" }, socket1User);

        const waitTime = new Promise((resolve) => setTimeout(() => resolve(), 500));
        const result = await waitTime;

        game.updateHpMobs({ lobbyName, mobName: "golovizin" }, socket1User);

        const waitTime1 = new Promise((resolve) => setTimeout(() => resolve(), 500));
        const result1 = await waitTime1;

        expect(game.lobbies[lobbyName].players[socket1User.id].hp).toEqual(95);
    });
});
