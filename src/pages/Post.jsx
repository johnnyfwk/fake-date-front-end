import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";
import ReplyCard from "../components/ReplyCard";

export default function Post() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {post_id} = useParams();

    const [isPostLoading, setIsPostLoading] = useState(true);
    const [isPostLoadedSuccessfully, setIsPostLoadedSuccessfully] = useState(null);
    const [post, setPost] = useState({});
    const [isRepliesLoading, setIsRepliesLoading] = useState(true);
    const [isRepliesLoadedSuccessfully, setIsRepliesLoadedSuccessfully] = useState(null);
    const [replies, setReplies] = useState([]);
    const [replyInput, setReplyInput] = useState("");
    const [isReplyPostedSuccessfully, setIsReplyPostedSuccessfully] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsPostLoading(true);
        setIsPostLoadedSuccessfully(null);
        api.getPostById(post_id)
            .then((response) => {
                setIsPostLoading(false);
                setIsPostLoadedSuccessfully(true);
                setPost(response);
            })
            .catch((error) => {
                setIsPostLoading(false);
                setIsPostLoadedSuccessfully(false);
            })
    }, [])

    useEffect(() => {
        setIsRepliesLoading(true);
        setIsRepliesLoadedSuccessfully(null);
        api.getRepliesByPostId(post_id)
            .then((response) => {
                setIsRepliesLoading(false);
                setIsRepliesLoadedSuccessfully(true);
                setReplies(response);
            })
            .catch((error) => {
                setIsRepliesLoading(false);
                setIsRepliesLoadedSuccessfully(false);
            })
    }, [isReplyPostedSuccessfully])

    function handleSubmit(event) {
        event.preventDefault();
        setIsReplyPostedSuccessfully(null);
        api.replyToAPost(new Date(), replyInput, post_id, userLoggedIn.user_id)
            .then((response) => {
                setIsReplyPostedSuccessfully(true);
                setTimeout(() => setIsReplyPostedSuccessfully(null), 3000);
                setReplyInput("");
            })
            .catch((error) => {
                setIsReplyPostedSuccessfully(false);
                setTimeout(() => setIsReplyPostedSuccessfully(null), 3000);
            })
    }

    function handleReplyInput(event) {
        setReplyInput(event.target.value);
    }

    if (isPostLoading) {
        return <p>Post is loading...</p>
    }

    if (isPostLoadedSuccessfully === false) {
        return <p className="error">Post could not be loaded.</p>
    }

    return (
        <main>
            <h1>{post.title}</h1>
            <Link to={`/profile/${post.user_id}`}>
                <img src={post.avatar_url} id="post-avatar-image"/>
            </Link>            
            <Link to={`/profile/${post.user_id}`}>{post.username}</Link>
            <div>Posted: {new Date(post.post_date).toLocaleDateString()} {new Date(post.post_date).toLocaleTimeString()}</div>
            <div>Seeking: {post.gender_of_date}</div>
            <div>Occasion: {post.occasion}</div>
            <div>City: {post.city}</div>
            <div>Date: {new Date(post.date).toLocaleDateString()}</div>
            <div>{post.description}</div>

            <h2>Send a Reply</h2>

            {isReplyPostedSuccessfully === null
                ? null
                : isReplyPostedSuccessfully === true
                    ? <p className="success">Your reply was posted!</p>
                    : <p className="error">Your reply could not be posted.</p>}

            <form onSubmit={handleSubmit}>
                <label htmlFor="post-reply"></label>
                <textarea
                    id="post-reply"
                    name="post-reply"
                    maxLength="300"
                    value={replyInput}
                    onChange={handleReplyInput}
                ></textarea>
                <span>{replyInput.length}/300</span>

                <input type="submit" value="Send Reply" disabled={!replyInput}></input>
            </form>

            <h2>Replies ({replies.length})</h2>

            {isRepliesLoading ? <p>Replies are loading...</p> : null}
            {replies.length ? null : <p>Be the first to reply to this post.</p>}
            {isRepliesLoadedSuccessfully === false ? <p className="error">Replies could not be loaded.</p> : null}

            <div id="reply-cards">
                {replies.map((reply) => {
                    return <ReplyCard key={reply.reply_id} reply={reply} />
                })}
            </div>
        </main>
    )
}