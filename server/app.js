const express = require("express");
const app = express();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
    },
});

const CONFIG = require("./config");
const { DATABASE } = CONFIG;

const Answer = require("./application/router/Answer");
const answer = new Answer();

const UserManager = require("./application/modules/user/UserManager");
const Lobby = require("./application/modules/lobby/Lobby");
const Game = require("./application/modules/game/Game");
const Chat = require("./application/modules/chat/Chat");
const DB = require("./application/modules/db/DB");
const db = new DB(DATABASE);
const user = new UserManager(answer, db, io);
const lobby = new Lobby(answer, db);
const game = new Game(answer, db);
new Chat(answer, db, io);

const Router = require("./application/router/Router");
const router = new Router(user, lobby, game);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Разрешить доступ с любых доменов
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(`${__dirname}/public`));
app.use("/", router);

server.listen(3001, () => console.log("Йа родилсо!!!"));
