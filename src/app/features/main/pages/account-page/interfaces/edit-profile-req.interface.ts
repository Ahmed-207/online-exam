export interface EditProfileReq {
    firstName: string
    lastName: string
    phone: string
}

export interface EditEmailReq {
    newEmail: string
}

export interface VerifyEmailCodeReq {
    code: string
}
export interface ChangePasswordReq {

    currentPassword: string,
    newPassword: string,
    confirmPassword: string

}
