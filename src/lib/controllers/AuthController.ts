import {graphql} from "../gql";
import {client} from "../../main.tsx";

const LOGIN_MUTATION = graphql(`
    query login($input: LoginInput!) {
        login(input: $input) {
            id,
            jwtToken,
        }       
    }
`)

export async function onLogin(email: string, password: string): Promise<ControllerResponse<string>> {
    try {
        const {data, errors} = await client.mutate({
            mutation: LOGIN_MUTATION,
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
