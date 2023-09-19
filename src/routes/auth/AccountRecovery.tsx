import "../../styles/auth.scss";
import {Link} from "react-router-dom";
import FooterComponent from "../../components/Footer.tsx";
import {useState} from "react";
import {toast} from "react-toastify";
import {onResetPasswordRequest} from "../../lib/controllers/auth-controller.ts";

export default function AccountRecoveryPage() {

    const [email, setEmail] = useState("");

    async function onResetClick() {
        if (email === "") {
            toast.error("Please enter your email address.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const response = await onResetPasswordRequest(email);
        if (!response.success) {
            toast.error('Failed to send reset password request', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        toast.success('Reset password request sent successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        });
    }

    return (
        <div>
            <div className="account-recovery">
                <div className="container-recovery">
                    <h2>Find Your Account</h2>
                    <hr className="divider"/>
                    <p>
                        Please enter your email address to search for your account.
                    </p>

                    <input
                        type="text"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <hr className="divider"/>

                    <div className="row-container">
                        <Link to={'/auth/login'} className="cancel-button">Cancel</Link>
                        <button
                            className="search-button"
                            onClick={() => {
                                onResetClick();
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </div>
    )
}
