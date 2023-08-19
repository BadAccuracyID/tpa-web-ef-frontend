import "../styles/auth.scss";
import {Link} from "react-router-dom";
import FooterComponent from "../components/Footer.tsx";

export default function AccountRecoveryPage() {
    return (
        <div>
            <div className="account-recovery">
                <div className="container-recovery">
                    <h2>Find Your Account</h2>
                    <hr className="divider"/>
                    <p>
                        Please enter your email address to search for your account.
                    </p>

                    <input type="text" placeholder="Email Address"/>
                    <hr className="divider"/>

                    <div className="row-container">
                        <Link to={'/login'} className="cancel-button">Cancel</Link>
                        <button className="search-button">Search</button>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
