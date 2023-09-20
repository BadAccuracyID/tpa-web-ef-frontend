import {DocumentNode} from "graphql/language";
import {getApolloClient} from "../../main.tsx";

interface MutationOptions {
    mutation: DocumentNode;
    variables: Record<string, unknown>;
}

interface QueryOptions {
    query: DocumentNode;
    variables: Record<string, unknown>;
}

export async function handleMutation<T>(mutationOptions: MutationOptions, mutationName: string, errorMessage: string): Promise<ControllerResponse<T>> {
    try {
        const {data, errors} = await getApolloClient().mutate(mutationOptions);

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data[mutationName]) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data[mutationName] as T,
        }
    } catch (error) {
        let errorMsg = errorMessage;
        if (error instanceof Error) {
            console.error(`${errorMessage}:`, error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}

export async function handleQuery<T>(queryOptions: QueryOptions, queryName: string, errorMessage: string): Promise<ControllerResponse<T>> {
    try {
        const {data, errors} = await getApolloClient().query(queryOptions);

        if (errors) {
            return {
                success: false,
                errorMsg: errors.map(e => e.message),
                data: null,
            }
        }

        if (!data[queryName]) {
            return {
                success: false,
                errorMsg: ['Invalid response from server'],
                data: null,
            }
        }

        return {
            success: true,
            errorMsg: null,
            data: data[queryName] as T,
        }
    } catch (error) {
        let errorMsg = errorMessage;
        if (error instanceof Error) {
            console.error(`${errorMessage}:`, error);
            errorMsg = error.message;
        }

        return {
            success: false,
            errorMsg: [errorMsg],
            data: null,
        };
    }
}
