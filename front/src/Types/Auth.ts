

export type LoginData = {
  email: string,
  password: string,
}

export type LoginRes = {
  user: UserWeb
  token: string
}

export type UserWeb = {
  id: string,
  name: string,
  email: string,
  password?: string,
}