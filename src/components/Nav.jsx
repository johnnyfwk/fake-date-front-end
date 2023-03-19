import { useState, useContext } from "react";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";

export default function Nav() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);
    const [isNavVisible, setisNavVisible] = useState(false);
    const [isShowNavButtonVisible, setIsShowNavButtonVisible] = useState(true);

    function onClickLogOut() {
        setUserLoggedIn({});
    }

    function onClickShowNavButton() {
        setisNavVisible(true);
        setIsShowNavButtonVisible(false);
    }

    function onClickHideNavButton() {
        setisNavVisible(false);
        setIsShowNavButtonVisible(true);
    }

    const styleNav = {
        left: isNavVisible ? "0%" : "100%"
    }

    return (
        <div id="nav">
            <div id="show-nav-button" onClick={onClickShowNavButton}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <nav style={styleNav}>
                <div id="hide-nav-button" onClick={onClickHideNavButton}>x</div>
                <Link to={`/profile/${userLoggedIn.user_id}`}>
                    <img src={userLoggedIn.avatar_url} title={userLoggedIn.username}  onClick={onClickHideNavButton}></img>
                </Link>
                <Link to={`/profile/${userLoggedIn.user_id}/messages`} id="messages-link"  onClick={onClickHideNavButton} title="Messages">&#9993;</Link>
                <Link to="/create-post"  onClick={onClickHideNavButton}>Find a Date</Link>
                <Link to="/sign-in" onClick={onClickLogOut} >Log out</Link>
            </nav>
        </div>
    )
}