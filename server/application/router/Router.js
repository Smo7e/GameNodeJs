const express = require("express");
const router = express.Router();

const notFoundHandler = require("./handlers/notFoundHandler");

const useLoginHandler = require("./handlers/userHandlers/useLoginHandler.js");
const useSignUpHandler = require("./handlers/userHandlers/useSignUp.js");
const useLogoutHandler = require("./handlers/userHandlers/useLogoutHandler.js");
const useGetUserByIdHandler = require("./handlers/userHandlers/useGetUserByIdHandler.js");
const useGetUserByTokenHandler = require("./handlers/userHandlers/useGetUserByTokenHandler.js");

//const useSendMessageHandler = require("./handlers/chatHandlers/useSendMessageHandler.js");
//const useGetMessagesHandler = require("./handlers/chatHandlers/useGetMessagesHandler.js");

const useGetItemsHandler = require("./handlers/lobbyHandlers/useGetItemsHandler.js");
const useAddFriendHandler = require("./handlers/lobbyHandlers/useAddFriendHandler.js");
const useGetFriendsHandler = require("./handlers/lobbyHandlers/useGetFriendsHandler.js");
const useGetGamersHandler = require("./handlers/lobbyHandlers/useGetGamersHandler.js");
const useAddGamersHandler = require("./handlers/lobbyHandlers/useAddGamersHandler.js");
const useDeleteGamersHandler = require("./handlers/lobbyHandlers/useDeleteGamersHandler.js");
const useUpdatePersonIdHandler = require("./handlers/lobbyHandlers/useUpdatePersonIdHandler.js");
const useGetGamerByIdHandler = require("./handlers/lobbyHandlers/useGetGamerByIdHandler.js");
const useAddInvitationHandler = require("./handlers/lobbyHandlers/useAddInvitationHandler.js");
const useCheckInvitesHandler = require("./handlers/lobbyHandlers/useCheckInvitesHandler.js");

const useUpdateHpHandler = require("./handlers/gameHandlers/useUpdateHpHandler.js");
const useGetQuestionsProgrammerHandler = require("./handlers/gameHandlers/useGetQuestionsProgrammerHandler.js");
const useUpdateHpMobsHandler = require("./handlers/gameHandlers/useUpdateHpMobsHandler.js");
const useGetMobsHandler = require("./handlers/gameHandlers/useGetMobsHandler.js");
const useMoveHandler = require("./handlers/gameHandlers/useMoveHandler.js");
const useMoveMobsHandler = require("./handlers/gameHandlers/useMoveMobsHandler.js");
const useGetSceneHandler = require("./handlers/gameHandlers/useGetSceneHandler.js");

function Router(user, lobby, game) {
    router.get("/login", useLoginHandler(user));
    router.get("/signUp", useSignUpHandler(user));
    router.get("/logout", useLogoutHandler(user));
    router.get("/getUserById", useGetUserByIdHandler(user));
    router.get("/getUserByToken", useGetUserByTokenHandler(user));

    //router.get("/sendMessage", useSendMessageHandler(chat));
    //router.get("/getMessages", useGetMessagesHandler(chat));

    router.get("/getItems", useGetItemsHandler(lobby));
    router.get("/addFriend", useAddFriendHandler(lobby));
    router.get("/getFriends", useGetFriendsHandler(lobby));
    router.get("/getGamers", useGetGamersHandler(lobby));
    router.get("/addGamers", useAddGamersHandler(lobby));
    router.get("/deleteGamers", useDeleteGamersHandler(game));
    router.get("/updatePersonId", useUpdatePersonIdHandler(lobby));
    router.get("/getGamerById", useGetGamerByIdHandler(lobby));
    router.get("/addInvitation", useAddInvitationHandler(lobby));
    router.get("/checkInvites", useCheckInvitesHandler(lobby));

    router.get("/updateHp", useUpdateHpHandler(game));
    router.get("/getQuestionsProgrammer", useGetQuestionsProgrammerHandler(game));
    router.get("/updateHpMobs", useUpdateHpMobsHandler(game));
    router.get("/getMobs", useGetMobsHandler(game));
    router.get("/move", useMoveHandler(game));
    router.get("/moveMobs", useMoveMobsHandler(game));
    router.get("/getScene", useGetSceneHandler(game));

    router.all("/*", notFoundHandler);
    return router;
}

module.exports = Router;
