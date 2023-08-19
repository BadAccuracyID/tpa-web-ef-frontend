import "../styles/auth.scss";
import {Link, redirect} from "react-router-dom";
import {useState} from "react";
import FooterComponent from "../components/Footer.tsx";
import {onLogin} from "../lib/controllers/AuthController.ts";

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onLoginClick = () => {
        setIsLoading(true);
        setErrorMessage('');

        if (email === '' || password === '') {
            setErrorMessage('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        onLogin(email, password)
            .then((result) => {
                if (!result.success && result.errorMsg) {
                    setErrorMessage(result.errorMsg[0]);
                    setIsLoading(false);
                    return;
                }

                // set token in local storage
                localStorage.setItem('token', result.data!);

                // redirect to home page
                redirect('/home');
            })
    }


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
                        <input type="text"
                               placeholder="Email address"
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}/>
                        <input type="password"
                               placeholder="Password"
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}
                        />

                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button className="login-button"
                                onClick={onLoginClick}>
                            {isLoading ? 'Loading...' : 'Log In'}
                        </button>
                        <Link to={'/auth/account-recovery'} className="forgot-link">Forgotten password?</Link>

                        <hr className="divider"/>

                        <Link to={'/auth/register'} className="create-account-button">Create new account</Link>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    );
}
