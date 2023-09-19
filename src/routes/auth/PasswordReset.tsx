import {Link, redirect, useNavigate, useParams} from "react-router-dom";
import {onSetPassword, onVerifyResetPasswordToken} from "../../lib/controllers/auth-controller.ts";
import {useEffect, useState} from "react";
import {User} from "../../lib/gql/graphql.ts";
import FooterComponent from "../../components/Footer.tsx";
import {toast} from "react-toastify";

export default function PasswordResetPage() {
    const navigate = useNavigate();
    const {token} = useParams();

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState<User | null>(null);

    async function validateToken(): Promise<ControllerResponse<User>> {
        if (!token) {
            redirect('/auth/login');
            return {
                success: false,
                errorMsg: ['Invalid token.'],
                data: null,
            };
        }

        const encodedToken = encodeURIComponent(token);
        console.log(encodedToken)
        return await onVerifyResetPasswordToken(encodedToken);
    }

    useEffect(() => {
        validateToken().then((response) => {
            if (!response.success) {
                redirect('/auth/login');
                return;
            }

            setUser(response.data);
        });
    }, []);

    async function onSubmitReset() {
        if (!user) {
            toast.error('Invalid token.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const response = await onSetPassword(user.id, newPassword);
        if (!response.success) {
            toast.error('Failed to set password.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Password set successfully.', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    }

    if (!user) {
        return (
            <div>
                <div className="account-recovery">
                    <div className="container-recovery">
                        <h2>Invalid Token</h2>
                        <hr className="divider"/>
                        <p>
                            The token you have provided is invalid. Please try again.
                        </p>

                        <hr className="divider"/>

                        <Link to={'/auth/login'} className="cancel-button">Back</Link>
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }

    return (
        <div>
            <div className="account-recovery">
                <div className="container-recovery">
                    <h2>Reset Password</h2>
                    <hr className="divider"/>
                    <p>
                        Please enter your new password.
                    </p>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <hr className="divider"/>

                    <div className="buttons">
                        <Link to={'/auth/login'} className="cancel-button">Cancel</Link>
                        <button
                            className="search-button"
                            onClick={() => onSubmitReset().then(() => navigate('/auth/login'))}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
