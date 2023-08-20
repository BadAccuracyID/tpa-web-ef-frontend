import "../../styles/auth.scss";
import {Link, useNavigate} from "react-router-dom";
import FooterComponent from "../../components/Footer.tsx";
import {useState} from "react";
import {onRegister} from "../../lib/controllers/auth-controller.ts";

export function RegisterPage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [gender, setGender] = useState('')

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const onRegisterClick = () => {
        setIsLoading(true);
        setErrorMessage('');

        if (firstName === '' || lastName === '' || email === '' || password === '' || confirmPassword === '' || dateOfBirth === '' || gender === '') {
            setErrorMessage('Please fill in all fields');
            setIsLoading(false);
            return;
        }

        if (!email.match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            setErrorMessage('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        if (new Date(dateOfBirth) > new Date()) {
            setErrorMessage('Please enter a valid date of birth');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        if (!password.match(/^[0-9a-zA-Z]+$/)) {
            setErrorMessage('Password must be alphanumeric');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsLoading(false);
            return;
        }

        onRegister(firstName, lastName, dateOfBirth, gender, email, password)
            .then((result) => {
                if (!result.success && result.errorMsg) {
                    setErrorMessage(result.errorMsg[0]);
                    setIsLoading(false);
                    return;
                }

                // set token in local storage
                localStorage.setItem('token', result.data!);

                // reset error message
                setErrorMessage('');
                setIsLoading(false);

                // redirect to success page
                navigate('/auth/register/successful')
            })
    }

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
                            <input type="text"
                                   placeholder="First Name"
                                   onChange={(e) => {
                                       setFirstName(e.target.value)
                                   }}
                            />
                            <input type="text"
                                   placeholder="Last Name"
                                   onChange={(e) => {
                                       setLastName(e.target.value)
                                   }}
                            />
                        </div>
                        <input type="email"
                               placeholder="Email Address"
                               onChange={(e) => {
                                   setEmail(e.target.value)
                               }}
                        />

                        <input type="password"
                               placeholder="Password"
                               onChange={(e) => {
                                   setPassword(e.target.value)
                               }}
                        />
                        <input type="password"
                               placeholder="Confirm Password"
                               onChange={(e) => {
                                   setConfirmPassword(e.target.value)
                               }}
                        />

                        <input type="date"
                               placeholder="Date of Birth"
                               onChange={(e) => {
                                   setDateOfBirth(e.target.value)
                               }}
                        />

                        <select onChange={(e) => {
                            setGender(e.target.value)
                        }}>
                            <option value="">Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}
                        <button className="register-button"
                                onClick={onRegisterClick}>
                            {isLoading ? 'Loading...' : 'Sign Up'}
                        </button>

                        <hr className="divider"/>

                        <Link to={'/auth/login'} className="login-redirect-button">Already have an account?</Link>
                    </div>

                </div>
            </div>
            <FooterComponent/>
        </div>
    );
}

export function RegisterSuccessfulPage() {
    return (
        <div>
            <div className="account-recovery">
                <div className="container-recovery">
                    <h2>Registration Successful</h2>
                    <hr className="divider"/>
                    <p>
                        An email has been sent to your email address. Please click on the link in the email to activate
                        your account.
                    </p>

                    <hr className="divider"/>

                    <Link to={'/auth/login'} className="search-button">Okay</Link>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
