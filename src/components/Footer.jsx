import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div id="footer">
            <footer>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </footer>
        </div>
    )
}