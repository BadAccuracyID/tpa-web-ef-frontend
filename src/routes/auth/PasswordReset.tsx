import {Await, Link, redirect, useParams} from "react-router-dom";
import {onSetPassword, onVerifyResetPasswordToken} from "../../lib/controllers/auth-controller.ts";
import {FullPageCircularLoading} from "../../components/loading/LoadingComponents.tsx";
import {Suspense, useState} from "react";
import {User} from "../../lib/gql/graphql.ts";
import FooterComponent from "../../components/Footer.tsx";
import {toast} from "react-toastify";

export default function PasswordResetPage() {
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
        return await onVerifyResetPasswordToken(encodedToken);
    }

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
        redirect('/auth/login');
    }

    return (
        <Suspense fallback={<FullPageCircularLoading/>}>
            <Await resolve={validateToken()}>
                {(response: ControllerResponse<User>) => {
                    if (!response.success) {
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

                    setUser(response.data!);
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

                                    <Link to={'/auth/login'} className="cancel-button">Cancel</Link>
                                    <button
                                        className="search-button"
                                        onClick={() => onSubmitReset()}
                                    >
                                        Reset
                                    </button>
                                </div>
                            </div>
                            <FooterComponent/>
                        </div>
                    )
                }}
            </Await>
        </Suspense>
    )
}
