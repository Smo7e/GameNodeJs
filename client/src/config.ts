// UdSU
// const DOMAIN = 'http://studfront';
// const PORT = 81;

// dev
const DOMAIN = "http://localhost";
const PORT = 3001;

// prod
//...

export const HOST = PORT ? `${DOMAIN}:${PORT}` : `${DOMAIN}`;

export const MEDIATOR = {
    EVENTS: {
        SERVER_ERROR: "SERVER_ERROR",
        GET_MESSAGES: "GET_MESSAGES",
        GET_SCENE: "GET_SCENE",
        GET_USER: "GET_USER",
        GET_GAMERS: "GET_GAMERS",
        GET_FRIENDS: "GET_FRIENDS",
        GET_INVITES: "GET_INVITES",
        LOGIN: "LOGIN",
        SIGNUP: "SIGNUP",
        LOGOUT: "LOGOUT",
        GET_MOBS: "GET_MOBS",
        GET_ERROR: "GET_ERROR",
        PLAY_MUSIC: "PLAY_MUSIC", 
        STOP_MUSIC: "STOP_MUSIC", 
        SET_MUSIC_VOLUME: "SET_MUSIC_VOLUME", 
        UPDATE_ARR_BULLET_TRAJECTORY: "UPDATE_ARR_BULLET_TRAJECTORY",
    },
    TRIGGERS: {},
};
