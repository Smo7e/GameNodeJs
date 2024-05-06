const CONFIG = {
    // dev
    DATABASE: {
        NAME: "studfront",
        HOST: "localhost",
        PORT: 5432,
        USER: "postgres",
        PASS: "111",
    },

    MESSAGES: {
        SEND_MESSAGE: "SEND_MESSAGE",
        GET_MESSAGES: "GET_MESSAGES",
    },
    MEDIATOR: {
        EVENTS: {
            TEST: "TEST",
            // SERVER_ERROR: "SERVER_ERROR",
        },
        TRIGGERS: {},
    },
};

module.exports = CONFIG;
