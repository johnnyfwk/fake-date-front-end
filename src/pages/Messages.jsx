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
    const [messages, setMessages] = useState();

    const navigate = useNavigate();

    console.log(userLoggedIn, "<------ userLoggedIn")

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsMessagesLoading(true);
        setIsGetMessagesSuccessful(null);
        api.getMessages()
            .then((response) => {
                setIsMessagesLoading(false);
                setIsGetMessagesSuccessful(true);
                const usersMessages = response.filter((userMessage) => {
                    return userMessage.sender_user_id === userLoggedIn.user_id || userMessage.receiver_user_id === userLoggedIn.user_id; 
                })
                setMessages(usersMessages);
            })
            .catch((error) => {
                setIsMessagesLoading(false);
                setIsGetMessagesSuccessful(false);
            })
    }, [user_id]);

    // console.log(messages, "<------- messages")

    return (
        <main>
            <h1>Messages</h1>

            {isMessagesLoading ? <p>Loading messages...</p> : null}

            {isGetMessagesSuccessful === null || isGetMessagesSuccessful === true
                ? null
                : <p className="error">Could not load messages.</p>}
            
            <div id="message-cards">
                {messages?.map((message) => {
                    return <MessageCard key={message.message_id} userLoggedIn={userLoggedIn} message={message}/>
                })}
            </div>
        </main>
    )
}