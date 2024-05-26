import md5 from "md5";

const loginPer = "123";
const password = "123";
const rnd = Math.round(Math.random() * 1000000);
const hash = md5(md5(loginPer + password) + rnd);
const login = {
    login: loginPer,
    hash: hash,
    rnd: rnd,
};

const sendMessage = {
    message: "Тестовое сообщение",
};

export default {
    login,
    sendMessage,
};
