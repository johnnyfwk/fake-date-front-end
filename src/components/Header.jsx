import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function Header() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    function onClickLogOut() {
        setUserLoggedIn({});
    }

    return (
        <header>
            <Link to="/" id="logo">Cotraveller</Link>

            {Object.keys(userLoggedIn).length === 0
                ? <div>
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                  </div>
                : null}

            {Object.keys(userLoggedIn).length > 0
                ? <Link to="/sign-in" onClick={onClickLogOut}>Log out</Link>
                : null}            
        </header>
    )
}