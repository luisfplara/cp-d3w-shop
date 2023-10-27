export interface User {
  _id: Realm.BSON.ObjectId | string
  access_token: string
  refresh_token?: string
}
export type UserContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  getAcessToken(): string | void
  logIn(logInUser: User): void
  logOut(): void
}
