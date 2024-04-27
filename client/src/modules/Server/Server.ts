import { io } from "socket.io-client";
import { Mediator } from "..";
import { TUser, TUserFull, TError, TMessage, TScene } from "./types";

export default class Server {
    private HOST: string;
    private token: string | null = null;
    private mediator: Mediator;
    socket: any;

    private hashGamers: string = "123";
    private hashMobs: string = "123";

    private gameInterval: ReturnType<typeof setInterval> | null = null;

    constructor(HOST: string, mediator: Mediator) {
        this.HOST = HOST;
        this.mediator = mediator;

        const socket = io(HOST);

        this.socket = socket;

        this.socket.on("connect", () => {
            this.socket.on("GET_MESSAGES", (data: any) => {
                const { messages } = data.data;
                if (messages?.length && Array.isArray(messages)) {
                    const { GET_MESSAGES } = this.mediator.getEventTypes();
                    this.mediator.call<Array<TMessage>>(GET_MESSAGES, messages);
                }
            });
            this.socket.on("GET_USER", (data: any) => {
                this.mediator.user = data;
                this.token = data.token;
            });

            this.socket.on("GET_GAMER", (data: any) => {
                this.mediator.gamer = data;
            });
            this.socket.on("GET_GAMERS", (data: any) => {
                this.mediator.gamers = data;
                const { GET_GAMERS } = this.mediator.getEventTypes();
                this.mediator.call(GET_GAMERS, data);
            });
            this.socket.on("GET_MOBS", (data: any) => {
                this.mediator.mobs = data;
            });
            this.socket.on("GET_FRIENDS", (data: any) => {
                console.log(data);
                this.mediator.mobs = data;
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

    // startGameInterval() {
    //     this.gameInterval = setInterval(async () => {
    //         const scene = await this.getScene();
    //         const { GET_SCENE } = this.mediator.getEventTypes();
    //         this.mediator.call<TScene>(GET_SCENE, scene);
    //     }, 150);
    // }

    // stopGameInterval() {
    //     if (this.gameInterval) {
    //         clearInterval(this.gameInterval);
    //         this.gameInterval = null;
    //     }
    // }

    login(login: string, hash: string, rnd: number): void {
        // const answer = await this.request<TUserFull>("login", { login, hash, rnd });
        // if (answer) {
        //     this.token = answer.token;
        //     return {
        //         id: answer.id,
        //         name: answer.name,
        //     };
        // }
        // return answer;

        this.socket.emit("LOGIN", { login, hash, rnd });
    }

    async logout() {
        const answer = await this.request<boolean>("logout");
        this.token = null;
        return answer;
    }

    signUp(login: string, nickname: string, hash: string, verifyHash: string): void {
        //return this.request<TUser>("signUp", { login, nickname, hash, verifyHash });
        this.socket.emit("SIGNUP", { token: this.token, login, nickname, hash, verifyHash });
    }
    sendMessage(message: string) {
        this.socket.emit("SEND_MESSAGE", { token: this.token, message });

        //return this.request("sendMessage", { token: this.token, message });
    }

    addFriend(id: string) {
        return this.request("addFriend", { id, token: this.token });
    }

    getFriends(): Promise<Array<number> | null> {
        return this.request("getFriends", { token: this.token });
    }

    async getScene(): Promise<TScene | null> {
        const answer = await this.request<TScene>("getScene", { hashGamers: this.hashGamers, hashMobs: this.hashMobs });
        if (answer && answer.hashGamers && answer.hashGamers !== this.hashGamers) {
            this.hashGamers = answer.hashGamers as string;
        }
        if (answer && answer.hashMobs && answer.hashMobs !== this.hashMobs) {
            this.hashMobs = answer.hashMobs as string;
        }
        return answer;
    }
    // async getUserByToken() {
    //     return await this.request("getUserByToken", {});
    // }
    async addGamers() {
        this.socket.emit("ADD_GAMERS", { token: this.token });
        // return await this.request("addGamers", {});
    }
    async deleteGamers() {
        this.socket.emit("DELETE_GAMERS", { token: this.token });
        //return await this.request("deleteGamers", {});
    }
    async updatePersonId(newPersonId: number) {
        return await this.request("updatePersonId", { newPersonId: newPersonId });
    }
    async getGamerById(userId: number) {
        return await this.request("getGamerById", { userId: userId });
    }
    async getGamers() {
        return await this.request("getGamers", { token: this.token });
    }
    async move(direction: string, x: number, y: number, status: string) {
        return await this.request("move", { direction, x, y, status });
    }
    async moveMobs(x: number, y: number) {
        //return await this.request("moveMobs", { x, y });
        this.socket.emit("MOVE_MOBS", { x, y });
    }
    getUserById(idFriend: number) {
        return this.request("getUserById", { id: idFriend });
    }
    addInvitation(userId: number, friendId: number) {
        //return this.request("addInvitation", { userId: userId, friendId: friendId });
        this.socket.emit("ADD_INVITES", { token: this.token, userId, friendId });
    }
    checkInvites(userId: number) {
        this.socket.emit("  ", { token: this.token, userId });
        //return this.request("checkInvites", { userId: userId });
    }
    async updateHp(gamerName: string, gamerHp: number) {
        return await this.request("updateHp", { gamerName: gamerName, gamerHp: gamerHp });
    }
    async getQuestionsProgrammer() {
        return await this.request("getQuestionsProgrammer", {});
    }
    async updateHpMobs() {
        return await this.request("updateHpMobs", {});
    }
    async getMobs() {
        return await this.request("getMobs", {});
    }
}
