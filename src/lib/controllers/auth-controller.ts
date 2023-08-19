import {graphql} from "../gql";
import {client} from "../../main.tsx";

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

export async function onLogin(email: string, password: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await client.query({
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
        const {data, errors} = await client.mutate({
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
        const {data, errors} = await client.mutate({
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
