const md5 = require("md5");
const DB = require("../application/modules/db/DB");
const Mediator = require("../application/modules/mediator/Mediator");
const UserManager = require("../application/modules/user/UserManager");
const Answer = require("../application/router/Answer");
const CONFIG = require("../config");
const express = require("express");
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

describe("Проверка событий пользователя", () => {
    const socketId = "testSocket";
    test("Проверка авторизации пользователя", async () => {
        await user.login({ login: "vasya", hash: "7c95e34107e38966f4ad80eea4d93f33", rnd: 1001 }, socketId);

        const addedUser = user.users[socketId];
        const { id, name } = addedUser;

        expect({ id, name }).toEqual({
            id: 1,
            name: "Vasya Ivanoff",
        });
    });

    test("Проверка Регистрации пользователя", async () => {
        const randomLogin = "testUser" + Math.floor(Math.random() * 10000);
        const randomNick = "testNick" + Math.floor(Math.random() * 10000);
        const rnd = Math.floor(Math.random() * 1000000);

        const hash = md5(randomLogin + "123");

        await user.signUp({ login: randomLogin, nickname: randomNick, hash: hash, verifyHash: hash }, socketId);
        await user.login({ login: randomLogin, hash: md5(hash + rnd), rnd: rnd }, socketId);

        const addedUser = user.users[socketId];

        const { name } = addedUser;

        expect({ name }).toEqual({
            name: randomNick,
        });
    });

    test("Проверка получения друзей пользователя из БД", async () => {
        const friends = await db.getFriends(1);

        expect(friends).not.toHaveLength(0);
    });

    test("Проверка добавления друзей пользователю", async () => {
        const addedUser = user.users[socketId];
        const { token, id } = addedUser;
        expect(token).toBeDefined();

        await user.addFriend({ token: token, friend_id: 2 }, socketId);

        const friends = await db.getFriends(id);
        const friendInfo = friends.map((friend) => ({ id: friend.id, login: friend.login }));

        expect(friendInfo).toEqual([{ id: 2, login: "petya" }]);
    });

    test("Проверка выхода пользователя", async () => {
        const addedUser = user.users[socketId];
        const { token } = addedUser;

        expect(token).toBeDefined();

        await user.logout({ token: token }, socketId);

        expect(user.users).toEqual({});
    });
});
