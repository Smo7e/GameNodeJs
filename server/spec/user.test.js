const md5 = require("md5");
const DB = require("../application/modules/db/DB");
const Chat = require("../application/modules/chat/Chat");
const Lobby = require("../application/modules/lobby/Lobby");
const Mediator = require("../application/modules/mediator/Mediator");
const UserManager = require("../application/modules/user/UserManager");
const Answer = require("../application/router/Answer");
const CONFIG = require("../config");
const express = require("express");
const { QUESTIONS, ITEMS } = require("./testConfig");
const { QUESTIONS_PROGRAMMER, QUESTIONS_RUSSIAN, QUESTIONS_MATH } = QUESTIONS;
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
const chat = new Chat(answer, db, io, mediator);
const lobby = new Lobby(answer, db, io, mediator);

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
        console.log(friends);

        expect(friends).toEqual([{ id: 2, name: "Petya Petroff" }]);
    });

    test("Проверка выхода пользователя", async () => {
        const addedUser = user.users[socketId];
        const { token } = addedUser;

        expect(token).toBeDefined();

        await user.logout({ token: token }, socketId);

        expect(user.users).toEqual({});
    });

    test("Получение пользователя по id", async () => {
        const getUser = await db.getUserById(1);

        const { id, login, password, name } = getUser;

        expect({ id, login, password, name }).toEqual({
            id: 1,
            login: "vasya",
            password: "4a2d247d0c05a4f798b0b03839d94cf0",
            name: "Vasya Ivanoff",
        });
    });

    test("Получение пользователя по login", async () => {
        const getLogin = await db.getUserByLogin("vasya");

        const { id, login, password, name } = getLogin;

        expect({ id, login, password, name }).toEqual({
            id: 1,
            login: "vasya",
            password: "4a2d247d0c05a4f798b0b03839d94cf0",
            name: "Vasya Ivanoff",
        });
    });

    test("Получение вопросов для программиста", async () => {
        const getQuestions = await db.getQuestionsProgrammer();

        expect(getQuestions).not.toHaveLength(0);
    });

    test("Проверка на получение предметов", async () => {
        const items = await db.getItems();

        expect(items).not.toHaveLength(0);
    });

    test("Проверка отправки сообщения в БД", async () => {
        const initialMessages = await db.getMessages();

        db.sendMessage(1, "Привет");

        const updatedMessages = await db.getMessages();

        expect(updatedMessages).toEqual([...initialMessages, { message: "Привет", name: "Vasya Ivanoff" }]);
    });

    test("Получение пользователя по token", async () => {
        const getToken = await db.getUserByToken("763e9137d4f852e5bdc1d6dc9221badb");

        const { id, login, password, name } = getToken;

        expect({ id, login, password, name }).toEqual({
            id: 2,
            login: "petya",
            password: "123",
            name: "Petya Petroff",
        });
    });

    test("Проверка обновления токена пользователя", async () => {
        const userBefore = await db.getUserById(1);

        const userId = userBefore.id;
        const userToken = userBefore.token;
        const rnd = Math.floor(Math.random() * 1000000);

        const newToken = md5(userBefore.password + rnd);
        expect(userToken).not.toBe(newToken);

        db.updateToken(userId, newToken);

        const userAfter = await db.getUserByToken(newToken);
        expect(userAfter.token).toBe(newToken);
    });
});
