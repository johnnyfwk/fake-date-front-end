export default function MessageCard({userLoggedIn, message}) {
    console.log(message.sender_user_id, "<------ message.sender_user_id");
    console.log(userLoggedIn.user_id, "<------- userLoggedIn.user_id");
    console.log(message.sender_user_id === userLoggedIn.user_id, "<------- message.sender_user_id === userLoggedIn.user_id");
    return (
        <div id="message-card">
            <img src={message.sender_avatar_url} alt={message.sender_avatar_url} />
            <div>{message.sender_username}</div>
        </div>
    )
}