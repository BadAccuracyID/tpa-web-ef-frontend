import '../styles/login.css'
import {Link} from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-container-left">
                    <div className="logo">facebook</div>
                    <p className="logo-slogan">Facebook helps you connect and share with the people in your life.</p>
                </div>

                <div className="login-container-right">
                    <input type="text" placeholder="Email or phone number"/>
                    <input type="password" placeholder="Password"/>

                    <button className="login-button">Log In</button>
                    <Link to={'/account-recovery'} className="forgot-link">Forgotten password?</Link>

                    <hr className="divider"/>

                    <Link to={'/register'} className="create-account-button">Create new account</Link>
                </div>
            </div>
        </div>
    );
}
