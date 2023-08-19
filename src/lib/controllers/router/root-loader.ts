import {redirect} from "react-router-dom";
import {getCurrentAccount} from "../user-controller.ts";
import {trimUrl} from "../../utils/utils.ts";

export const rootLoader = async (request: Request) => {
    const url = trimUrl(request.url);

    const isAuth = await getCurrentAccount();
    // if url is auth, check if logged in
    if (url.startsWith('/auth')) {
        if (isAuth.success) {
            return redirect('/home');
        }

        return null;
    }

    // if url is not auth, check if logged in
    if (!isAuth.success) {
        return redirect('/auth/login');
    }

    return null;
}

export const authLoader = async (request: Request) => {
    const url = trimUrl(request.url);

    const isAuth = await getCurrentAccount();
    if (url.endsWith('/auth')) {
        if (isAuth.success) {
            return redirect('/home');
        }

        return redirect('/auth/login');
    }


    if (isAuth.success) {
        return redirect('/home');
    }

    return null;
}

export const activateAccountLoader = async (request: Request) => {
    const url = trimUrl(request.url);

    const isAuth = await getCurrentAccount();
    if (url.endsWith('/activate-account')) {
        if (isAuth.success) {
            return redirect('/home');
        }

        return redirect('/auth/login');
    }

    if (isAuth.success) {
        return redirect('/home');
    }

    return null;
}
