// Tipagem para UsersWeb
export interface UserWeb {
  id: string;
  name: string;
  email: string;
  // password?: string;
}

// Tipagem para Devices
export interface Devices {
  id: string;
  name: string;
  ip: string;
  users: string;
  password: string;
  status: boolean;
  usersDevices?: UsersDevices[];
  groupsDevices?: GroupsDevices[];
  timeZonesDevices?: TimeZonesDevices[];
  timeSpansDevices?: TimeSpansDevices[];
  acccessRules?: AcccessRules[];
  usersGroups?: UsersGroups[];
}

// Tipagem para Users
export interface Users {
  id: string;
  name: string;
  beginTime?: number;
  endTime?: number;
  image: string; // O campo `Bytes` do Prisma é representado como Buffer no Node.js
  usersDevices?: UsersDevices[];
  usersGroups?: UsersGroups[];
}

// Tipagem para UsersGroups
export interface UsersGroups {
  id: string;
  idDevices: string;
  devices?: Devices;
  idUsers: string;
  users?: Users;
  idGroups: string;
  groups?: Groups;
}

// Tipagem para Groups
export interface Groups {
  id: string;
  name: string;
  groupsDevices?: GroupsDevices[];
  acccessRules?: AcccessRules[];
  usersGroups?: UsersGroups[];
}

// Tipagem para UsersDevices
export interface UsersDevices {
  id: string;
  code: number;
  idDevices: string;
  devices?: Devices;
  idUsers: string;
  users?: Users;
}

// Tipagem para GroupsDevices
export interface GroupsDevices {
  id: string;
  code: number;
  idDevices: string;
  devices?: Devices;
  idGroups: string;
  groups?: Groups;
}

// Tipagem para TimeZones
export interface TimeZones {
  id: string;
  name: string;
  timeSpans?: TimeSpans[];
  timeZonesDevices?: TimeZonesDevices[];
  acccessRules?: AcccessRules[];
}

// Tipagem para TimeZonesDevices
export interface TimeZonesDevices {
  id: string;
  code: number;
  idDevices: string;
  devices?: Devices;
  idTimeZones: string;
  timeZones?: TimeZones;
}

// Tipagem para TimeSpans
export interface TimeSpans {
  id: string;
  start: number;
  end: number;
  sun: number;
  mon: number;
  tue: number;
  wed: number;
  thu: number;
  fri: number;
  sat: number;
  hol1: number;
  hol2: number;
  hol3: number;
  timeZonesId: string;
  timeZones?: TimeZones;
  timeSpansDevices?: TimeSpansDevices[];
}

// Tipagem para TimeSpansDevices
export interface TimeSpansDevices {
  id: string;
  code: number;
  idDevices: string;
  devices?: Devices;
  idTimeSpans: string;
  timeSpans?: TimeSpans;
}

// Tipagem para AcccessRules
export interface AcccessRules {
  id: string;
  code: number;
  idDevices: string;
  devices?: Devices;
  idTimeZones: string;
  timeZones?: TimeZones;
  idGroups: string;
  groups?: Groups;
}
