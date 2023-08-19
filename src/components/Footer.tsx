import "../styles/footer.scss"
import {Link} from "react-router-dom";

export default function FooterComponent() {
    return (
        <div className="footer">
            <Link to={'/auth/login'} className="links">Log In</Link>
            <Link to={'/auth/register'} className="links">Sign Up</Link>
            <Link to={'/auth/account-recovery'} className="links">Forgot Account</Link>
            <a href='https://www.facebook.com/policies_center/' target="_blank" className="links">Terms</a>
            <a href='https://www.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0/'
               target="_blank" className="links">Cookies</a>
            <a href='https://www.facebook.com/help/' target="_blank" className="links">Help</a>

        </div>
    )
}
