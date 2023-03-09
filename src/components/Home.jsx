import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length === 0) {
            navigate("/sign-in");
        }
    }, [])

    return (
        <main>
            <h1>Home</h1>
            <p>Hi {userLoggedIn.username}. Browse the posts below to find a travel buddy.</p>
        </main>
    )
}