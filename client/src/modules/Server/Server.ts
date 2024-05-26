import { Socket, io } from "socket.io-client";
import { Mediator, Store } from "..";
import {
    TUserFull,
    TError,
    TMessage,
    TAnswer,
    TMessages,
    TGamer,
    TMob,
    TInvites,
    TFriend,
    TQuestion,
    TArrBullet,
} from "./types";
import { VARIABLE } from "../Store/Store";
import mocks from './mocks';

export default class Server {
    private token: string | null = null;
    private mediator: Mediator;
    private store: Store;
    private socket: Socket;
    public useMocks: boolean = false;

    constructor(HOST: string, mediator: Mediator, store: Store) {
        this.mediator = mediator;
        this.store = store;
        const socket = io(HOST);
        this.socket = socket;

        this.socket.on("connect", () => {
            this.socket.on("LOGIN", (data: TAnswer<TUserFull>): void => {
                const result = this._validate(data);
                if (result) {
                    store.update(VARIABLE.USER, result);
                    this.token = result.token;
                    const { LOGIN } = this.mediator.getEventTypes();
                    this.mediator.call(LOGIN, result);
                }
            });

            this.socket.on("SIGNUP", (data: TAnswer<string>): void => {
                const result = this._validate(data);
                if (result) {
                    const { SIGNUP } = this.mediator.getEventTypes();
                    this.mediator.call<Array<TMessage>>(SIGNUP);
                }
            });
            this.socket.on("LOGOUT", (data: TAnswer<string>): void => {
                const result = this._validate(data);
                if (result) {
                    const { LOGOUT } = this.mediator.getEventTypes();
                    this.mediator.call(LOGOUT);
                }
            });

            this.socket.on("GET_MESSAGES", (data: TAnswer<TMessages>): void => {
                const result = this._validate(data);
                if (result) {
                    const { messages } = result;
                    if (messages?.length && Array.isArray(messages)) {
                        const { GET_MESSAGES } = this.mediator.getEventTypes();
                        this.mediator.call<Array<TMessage>>(GET_MESSAGES, messages);
                    }
                }
            });
            this.socket.on("GET_USER", (data: TAnswer<TUserFull>): void => {
                const result = this._validate(data);
                if (result) {
                    store.update(VARIABLE.USER, result);
                    this.token = result.token;
                }
            });

            this.socket.on("GET_GAMERS", (data: TAnswer<TGamer[]>): void => {
                const result = this._validate(data);
                if (result) {
                    store.update(VARIABLE.GAMERS, result);
                    const { GET_GAMERS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_GAMERS, result);
                }
            });
            this.socket.on("GET_MOBS", (data: TAnswer<TMob[]>): void => {
                const result = this._validate(data);
                if (result) {
                    const { GET_MOBS } = this.mediator.getEventTypes();
                    store.update(VARIABLE.MOBS, result);
                    this.mediator.call(GET_MOBS, result);
                }
            });
            this.socket.on("GET_INVITES", (data: TAnswer<TInvites>): void => {
                const result = this._validate(data);
                if (result) {
                    const { GET_INVITES } = this.mediator.getEventTypes();
                    this.mediator.call(GET_INVITES, result);
                }
            });
            this.socket.on("GET_FRIENDS", (data: TAnswer<TFriend[]>): void => {
                const result = this._validate(data);
                if (result) {
                    const { GET_FRIENDS } = this.mediator.getEventTypes();
                    this.mediator.call(GET_FRIENDS, result);
                    store.update(VARIABLE.FRIENDS, result);
                }
            });
            this.socket.on("GET_QUESTIONS_PROGRAMMER", (data: TAnswer<TQuestion[]>): void => {
                const result = this._validate(data);
                if (result) {
                    store.update(VARIABLE.QUESTIONS, result);
                }
            });
            this.socket.on("GET_GAMER_BY_SOCKET_ID", (data: TAnswer<TGamer>): void => {
                const result = this._validate(data);
                if (result) {
                    store.update(VARIABLE.GAMER, result);
                }
            });
            this.socket.on("UPDATE_ARR_BULLET_TRAJECTORY", (data: TAnswer<TArrBullet>): void => {
                const result = this._validate(data);
                if (result) {
                    const { UPDATE_ARR_BULLET_TRAJECTORY } = this.mediator.getEventTypes();
                    this.mediator.call(UPDATE_ARR_BULLET_TRAJECTORY, result);
                }
            });
        });
    }
    private _validate<T>(data: TAnswer<T>): T | null {
        if (data?.result === "ok") {
            return data.data || null;
        }
        const { SERVER_ERROR } = this.mediator.getEventTypes();
        this.mediator.call<TError>(SERVER_ERROR, data.error);
        return null;
    }
    login(login: string, hash: string, rnd: number): void {
        if  (this.useMocks){
            this.loginOnHandler(mocks.login);
            return;
        }
        this.socket.emit("LOGIN", { login, hash, rnd });
    }

    private loginOnHandler(mockData: typeof mocks.login): void {
        const { LOGIN } = this.mediator.getEventTypes();
        this.mediator.call(LOGIN, mockData.data);
      }

    logout(): void {
        this.socket.emit("LOGOUT", { token: this.token });
    }

    signUp(login: string, nickname: string, hash: string, verifyHash: string): void {
        if  (this.useMocks){
            this.signUpOnHandler(mocks.signUp);
            return;
        }
        this.socket.emit("SIGNUP", { token: this.token, login, nickname, hash, verifyHash });
    }
    private signUpOnHandler(mockData: typeof mocks.signUp): void {
        const { SIGNUP } = this.mediator.getEventTypes();
        this.mediator.call(SIGNUP, mockData.data);
      }
    sendMessage(message: string): void {
        if  (this.useMocks){
            this.sendMessageUpOnHandler(mocks.sendMessage);
            return;
        }
        this.socket.emit("SEND_MESSAGE", { token: this.token, message });
    } 
    private sendMessageUpOnHandler(mockData: typeof mocks.sendMessage): void {
        const { SEND_MESSAGE } = this.mediator.getEventTypes();
        this.mediator.call(SEND_MESSAGE, mockData.data);
      }
    addFriend(friend_id: string): void {
        if  (this.useMocks){
            this.addFriendUpOnHandler(mocks.addFriend);
            return;
        }
        this.socket.emit("ADD_FRIENDS", { friend_id, token: this.token });
    }
    private addFriendUpOnHandler(mockData: typeof mocks.addFriend): void {
        const { ADD_FRIENDS } = this.mediator.getEventTypes();
        this.mediator.call(ADD_FRIENDS, mockData.data);
      }

    getFriends(): void {
        this.socket.emit("GET_FRIENDS", {});
    }

    addGamers(lobbyName: string): void {
        if  (this.useMocks){
            this.addGamersIdUpOnHandler(mocks.addGamers);
            return;
        }
        this.store.update(VARIABLE.LOBBYNAME, lobbyName);

        this.socket.emit("ADD_GAMERS", { token: this.token, lobbyName });
    }
    private addGamersIdUpOnHandler(mockData: typeof mocks.addGamers): void {
        const { ADD_GAMERS } = this.mediator.getEventTypes();
        this.mediator.call(ADD_GAMERS, mockData.data);
      }
    deleteGamers(): void {
        this.socket.emit("DELETE_GAMERS", { token: this.token });
    }
    updatePersonId(newPersonId: number): void {
        if  (this.useMocks){
            this.updatePersonIdUpOnHandler(mocks.updatePersonId);
            return;
        }
        this.socket.emit("UPDATE_PERSON_ID", {
            newPersonId,
            token: this.token,
            lobbyName: this.store.get(VARIABLE.LOBBYNAME),
        });
    }
    private updatePersonIdUpOnHandler(mockData: typeof mocks.updatePersonId): void {
        const {UPDATE_PERSON_ID} = this.mediator.getEventTypes();
        this.mediator.call(UPDATE_PERSON_ID, mockData.data);
      }
    getGamers(): void {
        this.socket.emit("GET_GAMERS", { token: this.token, lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    move(x: number, y: number): void {
        this.socket.emit("MOVE", { x, y, token: this.token, lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    moveMobs(x: number, y: number): void {
        if  (this.useMocks){
            this.moveMobsUpOnHandler(mocks.moveMobs);
            return;
        }
        this.socket.emit("MOVE_MOBS", { x, y, lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    private moveMobsUpOnHandler(mockData: typeof mocks.moveMobs): void {
        const {MOVE_MOBS} = this.mediator.getEventTypes();
        this.mediator.call(MOVE_MOBS, mockData.data);
      }
    addInvitation(userId: number, friendId: number): void {
        if  (this.useMocks){
            this.addInvitationUpOnHandler(mocks.addInvitation);
            return;
        }
        this.socket.emit("ADD_INVITES", {
            token: this.token,
            userId,
            friendId,
            lobbyName: this.store.get(VARIABLE.LOBBYNAME),
        });
    }
    private addInvitationUpOnHandler(mockData: typeof mocks.addInvitation): void {
        const {ADD_INVITES} = this.mediator.getEventTypes();
        this.mediator.call(ADD_INVITES, mockData.data);
      }
    checkInvites(userId: number): void {
        if  (this.useMocks){
            this.checkInvitesUpOnHandler(mocks.checkInvites);
            return;
        }
        this.socket.emit("GET_INVITES", { token: this.token, userId });
    }
    private checkInvitesUpOnHandler(mockData: typeof mocks.checkInvites): void {
        const {GET_INVITES} = this.mediator.getEventTypes();
        this.mediator.call(GET_INVITES, mockData.data);
      }
    updateHp(gamerName: string): void {
        if  (this.useMocks){
            this.updateHpUpOnHandler(mocks.updateHp);
            return;
        }
        this.socket.emit("UPDATE_HP", { gamerName, lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    private updateHpUpOnHandler(mockData: typeof mocks.updateHp): void {
        const {UPDATE_HP} = this.mediator.getEventTypes();
        this.mediator.call(UPDATE_HP, mockData.data);
      }
    getQuestionsProgrammer(): void {
        this.socket.emit("GET_QUESTIONS_PROGRAMMER", {});
    }
    updateHpMobs(): void {
        this.socket.emit("UPDATE_HP_MOBS", { lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    getMobs(): void {
        this.socket.emit("GET_MOBS", { lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
    createLobby(): void {
        const lobbyName = this.socket.id;
        this.socket.emit("CREATE_LOBBY", { token: this.token, lobbyName });
        this.store.update(VARIABLE.LOBBYNAME, lobbyName);
    }
    getGamerBySocketId(): void {
        this.socket.emit("GET_GAMER_BY_SOCKET_ID", { lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }

    updateArrBulletTrajectory(newArrBulletTrajectory: TArrBullet): void {
        this.socket.emit("UPDATE_ARR_BULLET_TRAJECTORY", {
            lobbyName: this.store.get(VARIABLE.LOBBYNAME),
            newArrBulletTrajectory,
        });
    }
    immortality() {
        this.socket.emit("IMMORTALITY", { lobbyName: this.store.get(VARIABLE.LOBBYNAME) });
    }
}
