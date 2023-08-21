import {getCurrentAccount} from "../controllers/user-controller.ts";
import {redirect} from "react-router-dom";

export const userLoader = async () => {
    const account = await getCurrentAccount();
    if (!account.success) {
        return redirect('/auth/login');
    }

    return account.data;
}
