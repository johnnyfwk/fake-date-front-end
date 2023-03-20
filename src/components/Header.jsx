import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user";
import Nav from "./Nav";

export default function Header({setIsDirectMessageFormVisible}) {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    return (
        <div id="header">
            <header>
                <Link to="/" id="logo">FakeDate</Link>

                {Object.keys(userLoggedIn).length === 0
                    ? <div id="header-sign-up-and-sign-in-links">
                        <Link to="/sign-in">Sign In</Link>
                        <Link to="/sign-up">Sign Up</Link>
                    </div>
                    : <Nav setIsDirectMessageFormVisible={setIsDirectMessageFormVisible}/>}
            </header>
        </div>
    )
}