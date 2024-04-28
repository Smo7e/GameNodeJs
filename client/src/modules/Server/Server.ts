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
                if (data.result === "ok") {
                    mediator.user = data.data;
                    const { LOGIN } = this.mediator.getEventTypes();
                    this.mediator.call(LOGIN, data.data);
                }
            });

            this.socket.on("SIGNUP", (data: any) => {
                if (data.result === "ok") {
                    const { SIGNUP } = this.mediator.getEventTypes();
                    this.mediator.call<Array<TMessage>>(SIGNUP);
                }
            });
            this.socket.on("LOGOUT", (data: any) => {
                if (data.result === "ok") {
                    const { LOGOUT } = this.mediator.getEventTypes();
                    this.mediator.call(LOGOUT);
                }
            });

            this.socket.on("GET_MESSAGES", (data: any) => {
                const { messages } = data.data;
                if (messages?.length && Array.isArray(messages)) {
                    const { GET_MESSAGES } = this.mediator.getEventTypes();
                    this.mediator.call<Array<TMessage>>(GET_MESSAGES, messages);
                }
            });
            this.socket.on("GET_USER", (data: any) => {
                if (data.result === "ok") {
                    this.mediator.user = data.data;
                    this.token = data.data.token;
                }
            });

            this.socket.on("GET_GAMER_BY_ID", (data: any) => {
                if (data.result === "ok") {
                    this.mediator.gamer = data.data;
                }
            });
            this.socket.on("GET_GAMERS", (data: any) => {
                if (data.result === "ok") {
                    this.mediator.gamers = data.data;
                    const { GET_GAMERS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_GAMERS, data.data);
                }
            });
            this.socket.on("GET_MOBS", (data: any) => {
                if (data.result === "ok") {
                    const { GET_MOBS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_MOBS, data.data);
                    this.mediator.mobs = data.data;
                }
            });
            this.socket.on("GET_INVITES", (data: any) => {
                if (data.result === "ok") {
                    const { GET_INVITES } = this.mediator.getEventTypes();
                    this.mediator.call(GET_INVITES, data.data);
                }
            });
            this.socket.on("GET_FRIENDS", (data: any) => {
                if (data.result === "ok") {
                    const { GET_FRIENDS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_FRIENDS, data.data);
                    this.mediator.friends = data.data;
                }
            });
            this.socket.on("GET_QUESTIONS_PROGRAMMER", (data: any) => {
                if (data.result === "ok") {
                    this.mediator.questions = data.data;
                }
            });
        });
    }

    async request<T>(method: string, params: any = {}): Promise<T | null> {
        try {
            if (this.mediator.user.token) {
                params.token = this.mediator.user.token;
            }
            const str = Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join("&");
            const res = await fetch(`${this.HOST}/${method}?${str}`);
            const answer = await res.json();
            if (answer.result === "ok") {
                return answer.data;
            }
            const { SERVER_ERROR } = this.mediator.getEventTypes();
            this.mediator.call<TError>(SERVER_ERROR, answer.error);
            return null;
        } catch (e) {
            return null;
        }
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

    async addGamers() {
        this.socket.emit("ADD_GAMERS", { token: this.token });
        // return await this.request("addGamers", {});
    }
    async deleteGamers() {
        this.socket.emit("DELETE_GAMERS", { token: this.token });
        //return await this.request("deleteGamers", {});
    }
    async updatePersonId(newPersonId: number) {
        this.socket.emit("UPDATE_PERSON_ID", { newPersonId, token: this.token });

        //return await this.request("updatePersonId", { newPersonId: newPersonId });
    }

    async getGamerById(userId: number) {
        this.socket.emit("GET_GAMER_BY_ID", { userId });

        //return await this.request("getGamerById", { userId: userId });
    }
    async getGamers() {
        this.socket.emit("GET_GAMERS", { token: this.token });

        //return await this.request("getGamers", { token: this.token });
    }
    async move(direction: string, x: number, y: number, status: string) {
        this.socket.emit("MOVE", { direction, x, y, status, token: this.token });

        //return await this.request("move", { direction, x, y, status });
    }
    async moveMobs(x: number, y: number) {
        //return await this.request("moveMobs", { x, y });
        this.socket.emit("MOVE_MOBS", { x, y });
    }
    // getUserById(idFriend: number) {
    //     return this.request("getUserById", { idFriend: idFriend });
    // }
    addInvitation(userId: number, friendId: number) {
        //return this.request("addInvitation", { userId: userId, friendId: friendId });
        this.socket.emit("ADD_INVITES", { token: this.token, userId, friendId });
    }
    checkInvites(userId: number) {
        this.socket.emit("GET_INVITES", { token: this.token, userId });
        //return this.request("checkInvites", { userId: userId });
    }
    async updateHp(gamerName: string, gamerHp: number) {
        this.socket.emit("UPDATE_HP", { gamerName });

        //return await this.request("updateHp", { gamerName });
    }
    async getQuestionsProgrammer() {
        this.socket.emit("GET_QUESTIONS_PROGRAMMER", {});

        //return await this.request("getQuestionsProgrammer", {});
    }
    async updateHpMobs() {
        this.socket.emit("UPDATE_HP_MOBS", {});

        //return await this.request("updateHpMobs", {});
    }
    async getMobs() {
        this.socket.emit("GET_MOBS", {});
        //return await this.request("getMobs", {});
    }
}
