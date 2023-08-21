import {Await, Link, redirect, useParams} from "react-router-dom";
import {Suspense} from "react";
import {FullPageCircularLoading} from "../../components/loading/LoadingComponents.tsx";
import {onActivateAccount} from "../../lib/controllers/auth-controller.ts";
import FooterComponent from "../../components/Footer.tsx";

export default function ActivateAccountPage() {
    const {token} = useParams();

    async function validateToken(): Promise<boolean> {
        if (!token) {
            redirect('/auth/login');
            return false;
        }

        const encodedToken = encodeURIComponent(token);

        const response = await onActivateAccount(encodedToken);
        return response.success;
    }

    return (
        <div>
            <Suspense fallback={<FullPageCircularLoading/>}>
                <Await resolve={validateToken()}>
                    {(success: boolean) => {
                        if (success) {
                            return (
                                <div>
                                    <div className="account-recovery">
                                        <div className="container-recovery">
                                            <h2>Activation Successful</h2>
                                            <hr className="divider"/>
                                            <p>
                                                Your account has been activated. You can now login.
                                            </p>

                                            <hr className="divider"/>

                                            <Link to={'/auth/login'} className="search-button">Okay</Link>
                                        </div>
                                    </div>
                                    <FooterComponent/>
                                </div>
                            )
                        } else {
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
                    }}
                </Await>
            </Suspense>
        </div>
    )
}
