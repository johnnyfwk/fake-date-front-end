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

    return (
        <main>
            <h1>Home</h1>
            <p>Browse posts by other users who are looking for a fake date.</p>

            <div id="post-cards">
                {posts
                    ? posts.map((post) => {
                        return <PostCard key={post.post_id} post={post} />
                      })
                    : null}
            </div>            
        </main>
    )
}