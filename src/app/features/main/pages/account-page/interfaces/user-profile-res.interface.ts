export interface UserProfileRes {
    status: boolean
    code: number
    payload: Payload
}

export interface Payload {
    user: User
}

export interface User {
    id: string
    username: string
    email: string
    phone: string
    firstName: string
    lastName: string
    profilePhoto: any
    emailVerified: boolean
    phoneVerified: boolean
    role: string
    createdAt: string
    updatedAt: string
}

export interface EmailChangeRes {
    message: string
    code: string
}

export interface DeleteAccountRes {
    message: string
}

