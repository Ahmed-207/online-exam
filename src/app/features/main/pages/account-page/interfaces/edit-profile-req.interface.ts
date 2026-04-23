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
