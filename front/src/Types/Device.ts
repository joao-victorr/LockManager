import type { DevicesGroup } from "./DevicesGroups";


export interface Device  {
  id: string;
  name: string;
  ip: string;
  users: string;
  UsersLocks: Array<string>;
  GroupsLocks: Array<DevicesGroup>;
  password: string;
  status: boolean;
}