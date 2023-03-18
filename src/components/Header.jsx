import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

export default function Header() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    function onClickLogOut() {
        setUserLoggedIn({});
    }

    return (
        <div id="header">
            <header>
                <Link to="/" id="logo">FakeDate</Link>

                {Object.keys(userLoggedIn).length === 0
                    ? <div>
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>
                    : <div id="log-out-messages-and-profile-links">
                        <Link to="/sign-in" onClick={onClickLogOut}>Log out</Link>
                        <Link to={`/profile/${userLoggedIn.user_id}/messages`} id="messages-link">&#9993;</Link>
                        <Link to={`/profile/${userLoggedIn.user_id}`}>
                            <img src={userLoggedIn.avatar_url} title={userLoggedIn.username}></img>
                        </Link>
                    </div>}
            </header>
        </div>
    )
}