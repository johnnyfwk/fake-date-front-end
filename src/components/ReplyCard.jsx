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
                {window.location.href.includes("profile")
                    ? <h3><Link to={`/posts/${reply.post_id}`}>{reply.title}</Link></h3>
                    : null}
                <div>{reply.reply}</div>
            </div>
        </div>
    )
}