

export type Device = {
  id: string;
  name: string;
  ip: string;
  users: string;
  UsersLocks: Array<string>;
  GroupsLocks: Array<string>;
  password: string;
  status: boolean;
}