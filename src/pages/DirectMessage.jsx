import { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/user";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as api from "../api";

export default function DirectMessage() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {other_user_id} = useParams();

    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [isMessagesLoadedSuccessfully, setIsMessagesLoadedSuccessfully] = useState(null);
    const [messages, setMessages] = useState([]);

    const [isUserLoading, setIsUserLoading] = useState(true);
    const [isUserLoadedSuccessfully, setIsUserLoadedSuccessfully] = useState(null);
    const [otherUser, setOtherUser] = useState({});

    const [messageInput, setMessageInput] = useState("");
    const [isMessageSentSuccessfully, setIsMessageSentSuccessfully] = useState(null);

    const [messageInputHeight, setMessageInputHeight] = useState("initial");

    const navigate = useNavigate();

    const lastMessageRef = useRef(null);

    const scrollToBottom = () => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
      }

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])
    
    useEffect(() => {
        setIsMessagesLoading(true);
        setIsMessagesLoadedSuccessfully(null);
        api.getMessagesByUserIdAsc(userLoggedIn.user_id)
            .then((response) => {
                setIsMessagesLoading(false);
                setIsMessagesLoadedSuccessfully(true);
                const messagesWithOtherUser = response.filter((message) => {
                    return message.sender_user_id === parseInt(other_user_id) || message.receiver_user_id === parseInt(other_user_id);
                })
                setMessages(messagesWithOtherUser);             
            })
            .catch((error) => {
                setIsMessagesLoading(false);
                setIsMessagesLoadedSuccessfully(false);
            })
    }, [isMessageSentSuccessfully])

    useEffect(() => {
        setIsUserLoading(true);
        setIsUserLoadedSuccessfully(null);
        api.getUserById(other_user_id)
            .then((response) => {
                setIsUserLoading(false);
                setIsUserLoadedSuccessfully(true);
                setOtherUser(response);
            })
            .catch((error) => {
                setIsUserLoading(false);
                setIsUserLoadedSuccessfully(false);
            })
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    function onChangeMessageInput(event) {
        setMessageInput(event.target.value);
        setMessageInputHeight(event.target.scrollHeight + "px");
    }

    function onClickSendMessageButton() {
        setIsMessageSentSuccessfully(null);
        api.sendDirectMessage(new Date(), messageInput, userLoggedIn.user_id, userLoggedIn.username, userLoggedIn.avatar_url, otherUser.user_id, otherUser.username, otherUser.avatar_url)
            .then((response) => {
                setIsMessageSentSuccessfully(true);
                setMessageInput("");
                setMessageInputHeight("initial");
                setTimeout(() => setIsMessageSentSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsMessageSentSuccessfully(false);
                setTimeout(() => setIsMessageSentSuccessfully(null), 3000);
            })
    }

    const styleMessageInput = {
        height: messageInputHeight
    }

    if (isUserLoading) {
        return <p>Page is loading.</p>
    }

    if (!isUserLoadedSuccessfully) {
        return <p className="error">Page could not be loaded.</p>
    }

    return (
        <div className="main">
            <main>
                <div id="direct-message-avatar-andother-user-username">
                    <Link to={`/profile/${otherUser.user_id}`}>
                        <img src={otherUser.avatar_url} alt={otherUser.avatar_url} id="direct-message-avatar"></img>
                    </Link>
                    <Link to={`/profile/${otherUser.user_id}`} id="direct-message-other-user-username"><h1>{otherUser.username}</h1></Link>
                </div>
                

                {isMessagesLoading ? <p>Loading</p> : null}

                {isMessagesLoadedSuccessfully === null
                    ? null
                    : isMessagesLoadedSuccessfully === true
                        ? null
                        : <p className="error">Messages could not be loaded.</p>}
                
                {messages.length === 0 ? <p>No messages.</p> : null}
                
                <div id="direct-message-cards-and-form">
                    <div id="direct-message-cards">
                        {messages?.map((message) => {
                            return <div key={message.message_id} id="direct-message-card" className={message.sender_user_id === userLoggedIn.user_id ? "justify-content-left" : "justify-content-right"} ref={lastMessageRef}>
                                <div id="direct-message-time-and-date">{new Date(message.message_date).toLocaleTimeString()} {new Date(message.message_date).toLocaleDateString()}</div>
                                <p id="direct-message-card-message" className={message.sender_user_id === userLoggedIn.user_id ? "message-logged-in-user" : "message-other-user"}
                                >{message.message}</p>
                            </div>
                        })}
                    </div>

                    {isMessageSentSuccessfully === null
                        ? null
                        : isMessageSentSuccessfully === true
                            ? null
                            : <p className="error">Message could not be sent.</p>}
                    
                    <form onSubmit={handleSubmit} id="direct-message-form">
                        <textarea
                            id="message-input"
                            name="message-input"
                            value={messageInput}
                            onChange={onChangeMessageInput}
                            style={styleMessageInput}
                        ></textarea>
                        <button type="submit" onClick={onClickSendMessageButton} disabled={!messageInput}>Send</button>
                    </form>
                </div>
            </main>
        </div>
    )
}