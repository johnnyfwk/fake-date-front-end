import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </footer>
    )
}