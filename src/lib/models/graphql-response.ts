type ControllerResponse<T> = {
    success: boolean,
    errorMsg: string[] | null,
    data: T | null
}
