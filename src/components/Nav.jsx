import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { Link } from "react-router-dom";

export default function Nav() {
    const {userLoggedIn, setUserLoggedIn} = useContext(UserContext);

    return (
        <div>
            {Object.keys(userLoggedIn).length > 0
                ? <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/create-post">Find a Date</Link>
                  </nav>
                : null}
        </div>
    )
}