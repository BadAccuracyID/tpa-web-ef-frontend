import {Subscription} from "../gql/graphql.ts";

export type SubscriptionControllerResponse<T> = {
    success: boolean,
    errorMsg: string[] | null,
    data: T | null
    subscription: Subscription | null
}
