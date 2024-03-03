import "./Message.css";
interface MessageProps {
    message: string;
    name: string;
}
const Message: React.FC<MessageProps> = ({ message, name }) => {
    return (
        <div className="Message-Container">
            <div className="message-name">{name}: </div>
            <div className="message">&nbsp;{message} </div>
        </div>
    );
};
export default Message;
