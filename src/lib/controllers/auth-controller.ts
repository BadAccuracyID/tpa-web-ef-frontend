import {graphql} from "../gql";
import {getApolloClient} from "../../main.tsx";

const LOGIN_QUERY = graphql(`
    query login($input: LoginInput!) {
        login(input: $input) {
            id,
            jwtToken,
        }
    }
`)

const REGISTER_MUTATION = graphql(`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            id,
            jwtToken,
        }
    }
`)

const ACTIVATE_USER_MUTATION = graphql(`
    mutation activateUser($request: String!) {
        activateUser(request: $request) {
            id
        }
    }
`)

//resetPasswordRequest(email: String!): User
const RESET_PASSWORD_REQUEST_QUERY = graphql(`
    query resetPasswordRequest($email: String!) {
        resetPasswordRequest(email: $email) {
            id
        }
    }
`)

// verifyResetPasswordToken(token: String!): String
const VERIFY_RESET_PASSWORD_TOKEN_QUERY = graphql(`
    query verifyResetPasswordToken($token: String!) {
        verifyResetPasswordToken(token: $token)
    }
`)

// setPassword(userId: String!, newPassword: String!): User
const SET_PASSWORD_MUTATION = graphql(`
    mutation setPassword($userId: String!, $newPassword: String!) {
        setPassword(userId: $userId, newPassword: $newPassword) {
            id
        }
    }
`)

export async function onLogin(email: string, password: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: LOGIN_QUERY,
            variables: {
                input: {email, password},
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.login) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.login.jwtToken!,
        };
    } catch (error) {
        let errorMsg = 'Error executing login';
        if (error instanceof Error) {
            console.error('Error executing login:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function onRegister(firstName: string, lastName: string, dateOfBirth: string, gender: string, email: string, password: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: REGISTER_MUTATION,
            variables: {
                input: {email, firstName, lastName, dateOfBirth, gender, password},
            },
        });

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.register) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.register.jwtToken!,
        };

    } catch (error) {
        let errorMsg = 'Error executing register';
        if (error instanceof Error) {
            console.error('Error executing register:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function onActivateAccount(token: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: ACTIVATE_USER_MUTATION,
            variables: {
                request: token
            }
        })

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.activateUser) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.activateUser.id!,
        };
    } catch (error) {
        let errorMsg = 'Error executing activateUser';
        if (error instanceof Error) {
            console.error('Error executing activateUser:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function onResetPasswordRequest(email: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: RESET_PASSWORD_REQUEST_QUERY,
            variables: {
                email
            }
        })

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.resetPasswordRequest) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.resetPasswordRequest.id!,
        };
    } catch (error) {
        let errorMsg = 'Error executing resetPasswordRequest';
        if (error instanceof Error) {
            console.error('Error executing resetPasswordRequest:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function onVerifyResetPasswordToken(token: string): Promise<ControllerResponse<boolean>> {
    try {
        const {data, errors} = await getApolloClient().query({
            query: VERIFY_RESET_PASSWORD_TOKEN_QUERY,
            variables: {
                token
            }
        })

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.verifyResetPasswordToken) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data.verifyResetPasswordToken!,
        };
    } catch (error) {
        let errorMsg = 'Error executing verifyResetPasswordToken';
        if (error instanceof Error) {
            console.error('Error executing verifyResetPasswordToken:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function onSetPassword(userId: string, newPassword: string): Promise<ControllerResponse<boolean>> {
    try {
        const {data, errors} = await getApolloClient().mutate({
            mutation: SET_PASSWORD_MUTATION,
            variables: {
                userId,
                newPassword
            }
        })

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data?.setPassword) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: true,
        };
    } catch (error) {
        let errorMsg = 'Error executing setPassword';
        if (error instanceof Error) {
            console.error('Error executing setPassword:', error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}
