import {Await, useParams} from "react-router-dom";
import {Suspense} from "react";
import {FullPageCircularLoading} from "../components/loading/LoadingComponents.tsx";

export default function ActivateAccountPage() {
    const {token} = useParams();

    async function wait5000ms() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true);
            }, 5000);
        });
    }

    return (
        <div>
            <Suspense fallback={<FullPageCircularLoading/>}>
                <Await resolve={wait5000ms()}>
                    {() => (
                        <div>
                            <h1>Account activated!</h1>
                            <p>Token: {token}</p>
                            <p>Your account has been activated.</p>
                            <p>You can now login.</p>
                        </div>
                    )}
                </Await>
            </Suspense>
        </div>
    )
}
