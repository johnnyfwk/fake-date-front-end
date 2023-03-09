import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/home");
        }
    }, [])

    return (
        <main>
            <h1>Sign In</h1>
            <p>Log into your account using the button below.</p>
        </main>
    )
}