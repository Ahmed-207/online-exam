export interface ResetPassReq {
    token: string
    newPassword: string
    confirmPassword: string
}
export interface ResetPassRes {
    message: string
}

