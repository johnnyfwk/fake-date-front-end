import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useParams, useNavigate, Link } from "react-router-dom";
import * as api from "../api";

export default function Messages() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {user_id} = useParams();

    const [isMessagesLoading, setIsMessagesLoading] = useState(true);
    const [isGetMessagesSuccessful, setIsGetMessagesSuccessful] = useState(null);
    const [latestMessagesFromOtherUsers, setLatestMessagesFromOtherUsers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsMessagesLoading(true);
        setIsGetMessagesSuccessful(null);
        api.getMessagesByUserIdDesc(userLoggedIn.user_id)
            .then((response) => {
                setIsMessagesLoading(false);
                setIsGetMessagesSuccessful(true);                
                const otherUsers = [];
                const lastMessagesFromEachUser = [];
                if (response) {
                    response.forEach((message) => {
                        if (lastMessagesFromEachUser.length === 0) {
                            if (message.sender_user_id === userLoggedIn.user_id) {
                                otherUsers.push(message.receiver_user_id);
                            } else {
                                otherUsers.push(message.sender_user_id);
                            }
                            lastMessagesFromEachUser.push(message);
                        } else {
                            if (message.sender_user_id === userLoggedIn.user_id) {
                                if (!otherUsers.includes(message.receiver_user_id)) {
                                    otherUsers.push(message.receiver_user_id);
                                    lastMessagesFromEachUser.push(message);
                                }
                            } else {
                                if (!otherUsers.includes(message.sender_user_id)) {
                                    otherUsers.push(message.sender_user_id);
                                    lastMessagesFromEachUser.push(message);
                                }
                            }
                        }
                    })                    
                }
                setLatestMessagesFromOtherUsers(lastMessagesFromEachUser);
            })
            .catch((error) => {
                setIsMessagesLoading(false);
                setIsGetMessagesSuccessful(false);
            })
    }, [user_id]);

    return (
        <div id="main">
            <main>
                <h1>Messages</h1>

                {isMessagesLoading ? <p>Loading messages...</p> : null}

                {isGetMessagesSuccessful === null || isGetMessagesSuccessful === true
                    ? null
                    : <p className="error">Could not load messages.</p>}
                
                {latestMessagesFromOtherUsers.length === 0 ? <p>You don't have any messages.</p> : null}

                <div id="message-cards">
                    {latestMessagesFromOtherUsers.map((message) => {
                        return <div key={message.message_id} id="message-card">
                            {userLoggedIn.user_id === message.sender_user_id
                                ? <Link to={`/profile/${message.receiver_user_id}`} id="message-card-avatar">
                                    <img src={message.receiver_avatar_url} alt={message.receiver_avatar_url} />
                                  </Link>
                                : <Link to={`/profile/${message.sender_user_id}`} id="message-card-avatar">
                                    <img src={message.sender_avatar_url} alt={message.sender_avatar_url} />
                                  </Link>}
                            
                            {userLoggedIn.user_id === message.sender_user_id
                            ? <Link to={`/profile/${userLoggedIn.user_id}/messages/${message.receiver_user_id}`} id="message-card-username-message-and-date">
                                <div id="message-card-username-and-message">
                                    <div id="message-card-username">{message.receiver_username}</div>
                                    <div id="message-card-message">{message.message}</div>
                                </div>
                                <div id="message-card-date">{new Date(message.message_date).toLocaleDateString()}</div>
                            </Link>                                
                            : <Link to={`/profile/${userLoggedIn.user_id}/messages/${message.sender_user_id}`} id="message-card-username-message-and-date">
                                <div id="message-card-username-and-message">
                                    <div id="message-card-username">{message.sender_username}</div>
                                    <div id="message-card-message">{message.message}</div>
                                </div>
                                <div id="message-card-date">{new Date(message.message_date).toLocaleDateString()}</div>
                            </Link>}
                        </div>
                    })}
                </div>
            </main>
        </div>
    )
}