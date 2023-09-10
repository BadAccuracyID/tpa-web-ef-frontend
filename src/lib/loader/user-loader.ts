import {getCurrentAccount, getUserById} from "../controllers/user-controller.ts";
import {redirect} from "react-router-dom";

export const userLoader = async () => {
    const account = await getCurrentAccount();
    if (!account.success) {
        return redirect('/auth/login');
    }

    return account.data;
}

export const userProfileLoader = async (id: string | null) => {
    if (id === null) {
        console.log('id is null')
        return redirect('/home');
    }

    const account = await getUserById(id);
    if (!account.success) {
        return redirect('/home');
    }

    return account.data;
}
