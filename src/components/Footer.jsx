import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div id="footer">
            <footer>
                <div id="footer-links">
                    <div>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div>
                        <Link to="/terms-and-conditions">Terms & Conditions</Link>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/cookies-policy">Cookies Policy</Link>
                        <Link to="/disclaimer">Disclaimer</Link>
                    </div>
                </div>
                <div id="copyright">Copyright &copy; {new Date().getFullYear()} FakeDate.co.uk. All Rights Reserved.</div>                
            </footer>
        </div>
    )
}