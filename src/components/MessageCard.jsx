export default function MessageCard({userLoggedIn, message}) {
    return (
        <div id="message-card">
            {userLoggedIn.user_id === message.sender_user_id
                ? <div>
                    <img src={message.receiver_avatar_url} alt={message.receiver_avatar_url} />
                    <div>{message.receiver_username}</div>
                  </div>
                : <div>
                    <img src={message.sender_avatar_url} alt={message.sender_avatar_url} />
                    <div>{message.sender_username}</div>
                  </div>}
            <div>{message.message}</div>
            <div>{new Date(message.message_date).toLocaleDateString()} {new Date(message.message_date).toLocaleTimeString()}</div>
        </div>
    )
}