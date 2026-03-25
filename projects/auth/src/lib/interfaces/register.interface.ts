export interface RegisterReq {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  phone: string
}

export interface RegisterRes {
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

export interface RegisterResAdapted {
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    token:string;
}
