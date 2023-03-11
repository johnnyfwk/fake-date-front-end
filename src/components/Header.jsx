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
            <Link to="/" id="logo">FakeDate</Link>

            {Object.keys(userLoggedIn).length === 0
                ? <div>
                    <Link to="/sign-in">Sign In</Link>
                    <Link to="/sign-up">Sign Up</Link>
                  </div>
                : null}

            {Object.keys(userLoggedIn).length > 0
                ? <div id="log-out-and-user-profile-links">
                    <Link to="/sign-in" onClick={onClickLogOut}>Log out</Link>
                    <Link to={`/profile/${userLoggedIn.user_id}`}>
                        <img src={userLoggedIn.avatar_url} title={userLoggedIn.username}></img>
                    </Link>
                  </div>
                
                : null}            
        </header>
    )
}