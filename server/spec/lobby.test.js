const DB = require("../application/modules/db/DB");
const Lobby = require("../application/modules/lobby/Lobby");
const Mediator = require("../application/modules/mediator/Mediator");
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
const lobby = new Lobby(answer, db, io, mediator);

describe("Проверка событий в лобби", () => {
    test(" Проверка получения предметав пользователя ", async () => {
        await lobby.addInvitation({
            userId: 2,
            friendId: 3,
            lobbyName: "testLobby",
        });

        expect(lobby.invites).toEqual({
            3: {
                friendsId: [2],
                lobbyName: "testLobby",
            },
        });
    });
});
