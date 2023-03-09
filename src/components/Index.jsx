import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/user";
import { useNavigate } from "react-router-dom";

export default function Index() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (Object.keys(userLoggedIn).length > 0) {
            navigate("/home");
        }
    }, [])

    return (
        <main>
            <h1>Welcome to Cotraveller</h1>
            <p>The app to find a travel buddy.</p>
        </main>
    )
}