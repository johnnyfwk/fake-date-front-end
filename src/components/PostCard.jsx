import { Link } from "react-router-dom";

export default function PostCard({post}) {
    return (
        <div id="post-card" loading="lazy">
            <Link to={`/profile/${post.user_id}`} id="post-card-avatar">
                <img src={post.avatar_url} alt={post.avatar_url} title={post.username}></img>
            </Link>
            <Link to={`/posts/${post.post_id}`} id="post-card-body">
                <div id="post-card-title">{post.title}</div>
                <div><b>Poster:</b> {post.username}</div>
                <div><b>Seeking:</b> {post.gender_of_date}</div>
                <div><b>City:</b> {post.city}</div>
                <div><b>Occasion:</b> {post.occasion}</div>
                <div><b>Date:</b> {new Date(post.date).toLocaleDateString()}</div>
            </Link>
        </div>
    )
}