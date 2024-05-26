import { TFriend, TGamer, TMob, TQuestion, TUserFull } from "../Server/types";
export enum VARIABLE {
    USER = "user",
    GAMER = "gamer",
    GAMERS = "gamers",
    FRIENDS = "friends",
    TRIGGER = "triger",
    MOBS = "mobs",
    TASKTIMER = "tim",
    LOBBYNAME = "lobbyName",
    QUESTIONS = "questions",
}
interface IVariable {
    user: TUserFull | null;
    gamer: TGamer | null;
    gamers: TGamer[];
    friends: TFriend[];
    triger: boolean;
    mobs: TMob[];
    tim: number;
    lobbyName: string;
    questions: TQuestion[] | null;
}
export default class Store {
    private variable: any;
    constructor() {
        this.variable = {
            user: null,
            gamer: null,
            gamers: [],
            friends: [],
            triger: false,
            mobs: [],
            taskTimer: 0,
            lobbyName: "",
            questions: null,
        };
    }
    get(name: VARIABLE) {
        return this.variable[name];
    }
    update<T>(name: VARIABLE, value: T) {
        if (this.variable.hasOwnProperty(name)) {
            this.variable[name] = value;
        }
    }
}
