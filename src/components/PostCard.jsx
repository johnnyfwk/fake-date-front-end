import { Link } from "react-router-dom";

export default function PostCard({post}) {
    return (
        <div id="post-card">
            <Link to={`/profile/${post.user_id}`} id="post-card-avatar">
                <img src={post.avatar_url} alt={post.avatar_url} title={post.username}></img>
            </Link>
            <Link to={`/posts/${post.post_id}`} id="post-card-body">
                <div id="post-card-title">{post.title}</div>
                <div><b>Poster:</b> {post.username}</div>
                <div><b>Posted:</b> {new Date(post.post_date).toLocaleDateString()} {new Date(post.post_date).toLocaleTimeString()}</div>
                <div><b>Seeking:</b> {post.gender_of_date}</div>
                <div><b>Occasion:</b> {post.occasion}</div>
                <div><b>City:</b> {post.city}</div>
                <div><b>Date:</b> {new Date(post.date).toLocaleDateString()}</div>
                <div id="post-card-description">{post.description}</div>
            </Link>
        </div>
    )
}