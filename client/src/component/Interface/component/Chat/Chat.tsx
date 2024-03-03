import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import { MediatorContext, ServerContext } from "../../../../App";
import { TMessage } from "../../../../modules/Server/types";
import Message from "../Message/Message";
import "./Chat.css";
const Chat: React.FC = () => {
    const mediator = useContext(MediatorContext);
    const server = useContext(ServerContext);
    const [messages, setMessages] = useState<TMessage[]>([{ message: "путо", name: "тут" }]);
    const [isActiveChat, setIsActiveChat] = useState(false);
    const messageRef = useRef<HTMLInputElement>(null);

    const { GET_MESSAGES } = mediator.getEventTypes();

    const chatHandler = () => {
        setIsActiveChat(!isActiveChat);
        if (isActiveChat) {
            server.stopChatInterval();
            return;
        }
        server.startChatInterval();
    };
    const sendMessagesHandler = () => {
        let message = messageRef.current!.value;
        if (message.length === 0) return;
        server.sendMessage(message);
    };
    useEffect(() => {
        const getMessagesHandler = (messages_: Array<TMessage>) => {
            if (messages_.length === 0) return;
            setMessages(messages_);
        };

        mediator.subscribe(GET_MESSAGES, getMessagesHandler);

        return () => {
            mediator.unsubscribe(GET_MESSAGES, getMessagesHandler);
        };
    });
    return (
        <div className="Chat-container">
            <div onClick={chatHandler} className="chat-interface">
                Чат
            </div>
            {isActiveChat ? (
                <div className="active-chat">
                    <div className="messages-list">
                        {messages.map((message_, index) =>
                            messages.length != 0 ? (
                                <Message
                                    key={index}
                                    message={message_.message}
                                    name={message_.name}
                                />
                            ) : (
                                <></>
                            )
                        )}
                    </div>
                    <div className="send-message-container">
                        <input
                            ref={messageRef}
                            type="text"
                            className="input-Message"
                            placeholder="Ваше сообщение"
                        />
                        <div className="Chat-image-container" onClick={sendMessagesHandler}>
                            <div className="Chat-image"></div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};
export default Chat;
