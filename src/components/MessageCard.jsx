export default function MessageCard({userLoggedIn, message}) {
    console.log(message.sender_user_id, "<------ message.sender_user_id");
    console.log(userLoggedIn.user_id, "<------- userLoggedIn.user_id");
    console.log(message.sender_user_id === userLoggedIn.user_id, "<------- message.sender_user_id === userLoggedIn.user_id");
    return (
        <div id="message-card" className={message.sender_user_id === userLoggedIn.user_id ? "message-card-left-align" : "message-card-right-align"}>
            <div>{new Date(message.message_date).toLocaleString()}</div>
            <img src={message.sender_avatar_url} alt={message.sender_avatar_url} />
            <div>{message.sender_username}</div>
            <div id="message-card-message">{message.message}</div>
        </div>
    )
}