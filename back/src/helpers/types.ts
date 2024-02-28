

export type UserWeb = {
  id: string;
  name: string;
  email: string;
}

export type Users = {
  name: string;
  image: Buffer;
  locks: Array<{
    id: string;
  }>;
};

export type DeletData = {
  id: string;
  locks: Array<{
    id: string;
  }>
}
export type DeletGroup = {
  id: string;
  GroupsLock: Array<{
    id_locks: string;
  }>
}

export type LockData = {
  name: string,
  ip: string,
  session: string
}

export type DataLockCode = {
  id: string;
  code: number;
}

export type DataTimesLockCode = {
  id: string;
  codeZones: number;
  codeSpans: number;
}

export type LocksSession = {
  id: string,
  ip: string,
  session: string
};

export type Locks = Array<{
  id: string
  name: string,
  ip: string,
  users: string,
  password: string
}>;

export type Group = {
  name: string,
  locks: Array<{
    id: string
  }>
}


export type Times = {
  name: string,
  locks: Array<{
    id: string
  }>
  timesSpans: {
    start: number
    end: number
    sun: number
    mon: number
    tue: number
    wed: number
    thu: number
    fri: number
    sat: number
    hol1: number
    hol2: number
    hol3: number
  }
}

export type AccessRules = {
  id: string
  GroupsLocks: Array<{code: number}>,
  TimeZonesLocks: Array<{code: number}>
}

export type UserGroup =  {
  id: string,
  UsersLocks: Array<{ code: number }>,
  GroupsLocks: Array<{ code: number }>
}

export type DataUserGroup = {
  id_user: string
  locks: Array<{
    id_lock: string
    id_group: string
  }>
}