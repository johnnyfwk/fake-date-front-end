import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <Link to="/" id="logo">Cotraveller</Link>
            <div>
                <Link to="/sign-in">Sign In</Link>
                <Link to="/sign-up">Sign Up</Link>
            </div>
        </header>
    )
}