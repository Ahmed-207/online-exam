export interface SignInReq {
    username: string,
    password: string
}
export interface SignInRes {
  user: User
  token: string
}

export interface User {
  id: string
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  profilePhoto: string
  emailVerified: boolean
  phoneVerified: boolean
  role: string
  createdAt: string
  updatedAt: string
}

export interface SignInResAdapted {
    firstName:string;
    lastName:string;
    profilePhoto:string;
    email:string;
    token:string;
}
