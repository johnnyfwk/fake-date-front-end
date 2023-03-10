import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/user";
import * as api from "../api";

export default function Profile({users, setUsers}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const {user_id} = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
    const [isGetUsersSuccessful, setIsGetUsersSuccessful] = useState(null);
    const [user, setUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])
    
    useEffect(() => {
        setIsLoading(true);
        setIsGetUsersSuccessful(null);
        api.getUsers()
            .then((response) => {
                setIsLoading(false);
                setIsGetUsersSuccessful(true);
                const userDetails = response.filter((user) => {
                    return user.user_id === parseInt(user_id);
                })
                setUser(userDetails[0]);
            })
            .catch((error) => {
                setIsLoading(false);
                setIsGetUsersSuccessful(false);
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (isGetUsersSuccessful === false) {
        return <p className="error">User information could not be loaded.</p>
    }

    return (
        <main>
            <h1>{user.username}</h1>
            <img src={user.avatar_url} id="profile-avatar-image"></img>
            <p>Join date: {new Date(user.join_date).toLocaleDateString()}</p>
        </main>
    )
}