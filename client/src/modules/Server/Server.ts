import { io } from "socket.io-client";
import { Mediator } from "..";
import { TUser, TUserFull, TError, TMessage, TScene } from "./types";

export default class Server {
    private HOST: string;
    private token: string | null = null;
    private mediator: Mediator;
    socket: any;

    constructor(HOST: string, mediator: Mediator) {
        this.HOST = HOST;
        this.mediator = mediator;

        const socket = io(HOST);

        this.socket = socket;

        this.socket.on("connect", () => {
            this.socket.on("LOGIN", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    mediator.user = result;
                    this.token = result.token;
                    const { LOGIN } = this.mediator.getEventTypes();
                    this.mediator.call(LOGIN, result);
                }
            });

            this.socket.on("SIGNUP", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { SIGNUP } = this.mediator.getEventTypes();
                    this.mediator.call<Array<TMessage>>(SIGNUP);
                }
            });
            this.socket.on("LOGOUT", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { LOGOUT } = this.mediator.getEventTypes();
                    this.mediator.call(LOGOUT);
                }
            });

            this.socket.on("GET_MESSAGES", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { messages } = result;
                    if (messages?.length && Array.isArray(messages)) {
                        const { GET_MESSAGES } = this.mediator.getEventTypes();
                        this.mediator.call<Array<TMessage>>(GET_MESSAGES, messages);
                    }
                }
            });
            this.socket.on("GET_USER", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    this.mediator.user = result;
                    this.token = result.token;
                }
            });

            this.socket.on("GET_GAMERS", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    this.mediator.gamers = result;
                    const { GET_GAMERS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_GAMERS, result);
                }
            });
            this.socket.on("GET_MOBS", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { GET_MOBS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_MOBS, result);
                    this.mediator.mobs = result;
                }
            });
            this.socket.on("GET_INVITES", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { GET_INVITES } = this.mediator.getEventTypes();
                    this.mediator.call(GET_INVITES, result);
                }
            });
            this.socket.on("GET_FRIENDS", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { GET_FRIENDS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_FRIENDS, result);
                    this.mediator.friends = result;
                }
            });
            this.socket.on("GET_QUESTIONS_PROGRAMMER", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    this.mediator.questions = result;
                }
            });
            this.socket.on("GET_GAMER_BY_SOCKET_ID", (data: any) => {
                const result = this._validate(data);

                if (result) {
                    this.mediator.gamer = result;
                }
            });
            this.socket.on("UPDATE_ARR_BULLET_TRAJECTORY", (data: any) => {
                const result = this._validate(data);
                if (result) {
                    const { UPDATE_ARR_BULLET_TRAJECTORY } = this.mediator.getEventTypes();
                    this.mediator.call(UPDATE_ARR_BULLET_TRAJECTORY, result);
                }
            });
        });
    }
    _validate(data: any) {
        if (data.result === "ok") {
            return data.data;
        }
        const { SERVER_ERROR } = this.mediator.getEventTypes();
        this.mediator.call<TError>(SERVER_ERROR, data.error);
        return null;
    }
    login(login: string, hash: string, rnd: number): void {
        this.socket.emit("LOGIN", { login, hash, rnd });
    }

    async logout() {
        this.socket.emit("LOGOUT", { token: this.token });
    }

    signUp(login: string, nickname: string, hash: string, verifyHash: string): void {
        this.socket.emit("SIGNUP", { token: this.token, login, nickname, hash, verifyHash });
    }
    sendMessage(message: string) {
        this.socket.emit("SEND_MESSAGE", { token: this.token, message });
    }

    addFriend(friend_id: string) {
        this.socket.emit("ADD_FRIENDS", { friend_id, token: this.token });
    }

    getFriends() {
        this.socket.emit("GET_FRIENDS", {});
    }

    async addGamers(lobbyName: any) {
        this.mediator.lobbyName = lobbyName;
        this.socket.emit("ADD_GAMERS", { token: this.token, lobbyName });
    }
    async deleteGamers() {
        this.socket.emit("DELETE_GAMERS", { token: this.token });
    }
    async updatePersonId(newPersonId: number) {
        this.socket.emit("UPDATE_PERSON_ID", { newPersonId, token: this.token, lobbyName: this.mediator.lobbyName });
    }
    async getGamers() {
        this.socket.emit("GET_GAMERS", { token: this.token, lobbyName: this.mediator.lobbyName });
    }
    async move(x: number, y: number) {
        this.socket.emit("MOVE", { x, y, token: this.token, lobbyName: this.mediator.lobbyName });
    }
    async moveMobs(x: number, y: number) {
        this.socket.emit("MOVE_MOBS", { x, y, lobbyName: this.mediator.lobbyName });
    }
    addInvitation(userId: number, friendId: number) {
        this.socket.emit("ADD_INVITES", { token: this.token, userId, friendId, lobbyName: this.mediator.lobbyName });
    }
    checkInvites(userId: number) {
        this.socket.emit("GET_INVITES", { token: this.token, userId });
    }
    async updateHp(gamerName: string) {
        this.socket.emit("UPDATE_HP", { gamerName, lobbyName: this.mediator.lobbyName });
    }
    async getQuestionsProgrammer() {
        this.socket.emit("GET_QUESTIONS_PROGRAMMER", {});
    }
    async updateHpMobs() {
        this.socket.emit("UPDATE_HP_MOBS", { lobbyName: this.mediator.lobbyName });
    }
    async getMobs() {
        this.socket.emit("GET_MOBS", { lobbyName: this.mediator.lobbyName });
    }
    async createLobby() {
        const lobbyName = this.socket.id;
        this.socket.emit("CREATE_LOBBY", { token: this.token, lobbyName });
        this.mediator.lobbyName = lobbyName;
    }
    async getGamerBySocketId() {
        this.socket.emit("GET_GAMER_BY_SOCKET_ID", { lobbyName: this.mediator.lobbyName });
    }

    async updateArrBulletTrajectory(newArrBulletTrajectory: any) {
        this.socket.emit("UPDATE_ARR_BULLET_TRAJECTORY", {
            lobbyName: this.mediator.lobbyName,
            newArrBulletTrajectory,
        });
    }
}
