import "../styles/auth.scss";
import {Link} from "react-router-dom";
import Footer from "../components/footer.tsx";

export default function LoginPage() {
    return (
        <div>
            <div className="login">
                <div className="container">
                    <div className="container-left">
                        <div className="logo">facebook</div>
                        <p className="logo-slogan">Facebook helps you connect and share with the people in your
                            life.</p>
                    </div>

                    <div className="container-right-login">
                        <input type="text" placeholder="Email address"/>
                        <input type="password" placeholder="Password"/>

                        <button className="login-button">Log In</button>
                        <Link to={'/account-recovery'} className="forgot-link">Forgotten password?</Link>

                        <hr className="divider"/>

                        <Link to={'/register'} className="create-account-button">Create new account</Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
