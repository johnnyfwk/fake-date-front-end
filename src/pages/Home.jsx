import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import PostCard from "../components/PostCard";

export default function Home({posts, setPosts}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const [isPostsLoading, setIsPostsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    useEffect(() => {
        setIsPostsLoading(true);
        api.getPosts()
            .then((response) => {
                setPosts(response);
                setIsPostsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsPostsLoading(false);
            })
    }, [])

    // console.log(posts);

    return (
        <main>
            <h1>Home</h1>
            <p>Hi {userLoggedIn.username}. Browse the posts below to find a travel buddy.</p>

            <div id="post-cards">
                {posts.map((post) => {
                    return <PostCard key={post.post_id} post={post} />
                })}
            </div>            
        </main>
    )
}