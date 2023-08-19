import "../styles/auth.scss";
import {Link} from "react-router-dom";
import FooterComponent from "../components/Footer.tsx";

export default function RegisterPage() {
    return (
        <div>
            <div className="register">
                <div className="container">

                    <div className="container-left">
                        <div className="logo">facebook</div>
                        <p className="logo-slogan">Facebook helps you connect and share with the people in your
                            life.</p>
                    </div>

                    <div className="container-right-register">
                        <div className="row-container">
                            <input type="text" placeholder="First Name"/>
                            <input type="text" placeholder="Last Name"/>
                        </div>
                        <input type="email" placeholder="Email Address"/>

                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>

                        <input type="date" placeholder="Date of Birth"/>

                        <select>
                            <option value="">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>

                        <button className="register-button">Sign Up</button>

                        <hr className="divider"/>

                        <Link to={'/auth/login'} className="login-redirect-button">Already have an account?</Link>
                    </div>

                </div>
            </div>
            <FooterComponent/>
        </div>
    );
};
