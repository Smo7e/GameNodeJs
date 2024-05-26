import { TFriend, TGamer, TMob, TMobs, TQuestion, TUserFull } from "../Server/types";
export enum VARIABLE {
    USER = "user",
    GAMER = "gamer",
    GAMERS = "gamers",
    FRIENDS = "friends",
    TRIGGERTRUSOV = "trigerTrusov",
    TRIGGERRUSANOVA = "trigerRusanova",
    TRIGGERGOLOVIZIN = "trigerGolovizin",
    MOBS = "mobs",
    TASKTIMER = "tim",
    LOBBYNAME = "lobbyName",
    QUESTIONSPROGRAMMER = "questionsProgrammer",
    QUESTIONSRUSSIAN = "questionsRussian",
    QUESTIONSMATH = "questionsMath",
    CURRENTMOB = "currentMob",
}
interface IVariable {
    user: TUserFull | null;
    gamer: TGamer | null;
    gamers: TGamer[];
    friends: TFriend[];
    trigerTrusov: boolean;
    mobs: TMobs;
    tim: number;
    lobbyName: string;
    questions: TQuestion[] | null;
    currentMob: TMob | null;
}
export default class Store {
    private variable: any;
    constructor() {
        this.variable = {
            user: null,
            gamer: null,
            gamers: [],
            friends: [],
            trigerTrusov: false,
            trigerRusanova: false,
            trigerGolovizin: false,
            mobs: [],
            taskTimer: 0,
            lobbyName: "",
            questionsProgrammer: null,
            questionsRussian: null,
            questionsMath: null,
            currentMob: null,
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
