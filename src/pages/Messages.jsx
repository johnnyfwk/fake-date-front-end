import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../api";
import MessageCard from "../components/MessageCard";

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
        api.getMessagesByUserId(userLoggedIn.user_id)
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
        <main>
            <h1>Messages</h1>

            {isMessagesLoading ? <p>Loading messages...</p> : null}

            {isGetMessagesSuccessful === null || isGetMessagesSuccessful === true
                ? null
                : <p className="error">Could not load messages.</p>}
            
            {latestMessagesFromOtherUsers.length === 0 ? <p>You don't have any messages.</p> : null}

            <div id="message-cards">
                {latestMessagesFromOtherUsers?.map((message) => {
                    return <MessageCard key={message.message_id} userLoggedIn={userLoggedIn} message={message}/>
                })}
            </div>
        </main>
    )
}