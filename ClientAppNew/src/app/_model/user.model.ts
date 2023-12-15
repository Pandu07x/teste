export interface User {
    role: string
    name: string
    permissions: string
    userId: string
    email: string
  }

  export class localStorageModel{
    access_token:string
    user:User
  }

  export interface USerDto {
    user: AppUser
    roles: Role[]
  }
  export interface Claim {
    id: number
    userId: number
    claimType: string
    claimValue: string
  }

  export interface AppUser {
    fullName: string
    updatedDate: string
    updatedBy: number
    roles: any[]
    claims: Claim[]
    id: number
    userName: string
    normalizedUserName: string
    email: string
    normalizedEmail: string
    emailConfirmed: boolean
    passwordHash: string
    securityStamp: string
    concurrencyStamp: string
    phoneNumber: any
    phoneNumberConfirmed: boolean
    twoFactorEnabled: boolean
    lockoutEnd: any
    lockoutEnabled: boolean
    accessFailedCount: number
    roleDto:Role[]
    password:string
  }

  export interface Role {
    description: string
    updatedDate: string
    updatedBy: number
    claims: Claim[]
    id: number
    name: string
    normalizedName: string
    concurrencyStamp: string
  }