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
    }

    function onClickSendMessageButton() {
        setIsMessageSentSuccessfully(null);
        api.sendDirectMessage(new Date(), messageInput, userLoggedIn.user_id, userLoggedIn.username, userLoggedIn.avatar_url, otherUser.user_id, otherUser.username, otherUser.avatar_url)
            .then((response) => {
                setIsMessageSentSuccessfully(true);
                setMessageInput("");
                setTimeout(() => setIsMessageSentSuccessfully(null), 3000);
            })
            .catch((error) => {
                setIsMessageSentSuccessfully(false);
                setTimeout(() => setIsMessageSentSuccessfully(null), 3000);
            })
    }

    if (isUserLoading) {
        return <p>Page is loading.</p>
    }

    if (!isUserLoadedSuccessfully) {
        return <p className="error">Page could not be loaded.</p>
    }

    return (
        <div id="main">
            <main>
                <Link to={`/profile/${otherUser.user_id}`}>
                    <img src={otherUser.avatar_url} alt={otherUser.avatar_url} id="direct-message-avatar"></img>
                </Link>
                <Link to={`/profile/${otherUser.user_id}`}><h1>{otherUser.username}</h1></Link>

                {isMessagesLoading ? <p>Loading</p> : null}

                {isMessagesLoadedSuccessfully === null
                    ? null
                    : isMessagesLoadedSuccessfully === true
                        ? null
                        : <p className="error">Messages could not be loaded.</p>}
                
                {messages.length === 0 ? <p>No messages.</p> : null}
                
                <div id="direct-message-cards">
                    {messages?.map((message) => {
                        return <div
                            key={message.message_id}
                            id="direct-message-card"
                            className={message.sender_user_id === userLoggedIn.user_id ? "justify-content-left" : "justify-content-right"}
                            ref={lastMessageRef}>
                            {message.sender_user_id === userLoggedIn.user_id
                                ? <div id="direct-message-card-message">
                                    <div>{message.message}</div>
                                    <div>{new Date(message.message_date).toLocaleTimeString()} {new Date(message.message_date).toLocaleDateString()}</div>
                                </div>                            
                                : <div id="direct-message-card-avatar-username-and-message">
                                    <img src={message.sender_avatar_url} alt={message.sender_avatar_url} />
                                    <div>{message.sender_username}</div>
                                    <div>{message.message}</div>
                                    <div>{new Date(message.message_date).toLocaleTimeString()} {new Date(message.message_date).toLocaleDateString()}</div>
                                </div>}       
                        </div>
                    })}
                </div>

                {isMessageSentSuccessfully === null
                    ? null
                    : isMessageSentSuccessfully === true
                        ? null
                        : <p className="error">Message could not be sent.</p>}
                
                <form onSubmit={handleSubmit} id="direct-message-form">
                    <input
                        type="text"
                        id="message-input"
                        name="message-input"
                        value={messageInput}
                        onChange={onChangeMessageInput}
                    ></input>
                    <input type="submit" value="Send" onClick={onClickSendMessageButton} disabled={!messageInput}></input>
                </form>
            </main>
        </div>
    )
}