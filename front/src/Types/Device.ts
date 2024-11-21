import type { DevicesGroup } from "./DevicesGroups";


export type Device = {
  id: string;
  name: string;
  ip: string;
  users: string;
  UsersDevices: Array<string>;
  GroupsDevices: Array<DevicesGroup>;
  password: string;
  status: boolean;
}