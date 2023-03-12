import { Link } from "react-router-dom";

export default function ReplyCard({reply}) {
    return (
        <div id="reply-card">
            <div id="reply-card-owner">
                <Link to={`/profile/${reply.user_id}`}>
                    <img src={reply.avatar_url}></img>
                </Link>
                <Link to={`/profile/${reply.user_id}`}>{reply.username}</Link>
            </div>
            <div id="reply-card-body">
                <div>{new Date(reply.reply_date).toLocaleDateString()} {new Date(reply.reply_date).toLocaleTimeString()}</div>
                <div>{reply.reply}</div>
            </div>
        </div>
    )
}