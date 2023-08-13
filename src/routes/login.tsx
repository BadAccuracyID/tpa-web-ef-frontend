import '../styles/login.css'

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
                    <a href="#" className="forgot-link">Forgotten password?</a>

                    <hr className="divider"/>

                    <button className="create-account-button">Create new account</button>
                </div>
            </div>
        </div>
    );
}
