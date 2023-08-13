import "../styles/account-recovery.css";
import {Link} from "react-router-dom";

export default function AccountRecoveryPage() {
    return (
        <div className="account-recovery-page">
            <div className="container">
                <h3>Find Your Account</h3>
                <hr className="divider"/>
                <p>
                    Please enter your email address to search for your account.
                </p>

                <input type="text" placeholder="Email Address"/>

                <hr className="divider"/>

                <div className="buttons-container">
                    <Link to={'/login'} className="cancel-button">Cancel</Link>
                    <button className="search-button">Search</button>
                </div>
            </div>
        </div>
    )
}
