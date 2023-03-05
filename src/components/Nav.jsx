import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Nav() {
    const { user, isAuthenticated, isLoading } = useAuth0();

    return (
        <div>
            {isAuthenticated
                ? <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                  </nav>
                : null}
        </div>
    )
}