
export type UserType = {
  id: string;
  name: string;
  email: string;
}

export type DataUser = {
  id: string;
  name: string;
  image: {
    type: string;
    data: Buffer
  };
  UsersLocks: Array<{
    id_lock: string;
  }>;
  UsersGroups: Array<{
    id_group: string;
  }>;
}

export type DataLock = {
  id: string;
  name: string;
  ip: string;
  GroupsLocks: Array<GroupsLocks>,
}

export type GroupsLocks = {
      id: string;
      code: number;
      groups: {
          id: string;
          name: string
      };
}


export type DataLocksGroups = {
  id: string;
  groups: Array<{
    id: string;
  }>
}

export type NewUser = {
  name: string;
  image: File;
  locks: Array<{
    id: string;
  }>;
}


export type NewUserGruop = {
  id_user: string;
  locks: Array<{
    id: string;
  }>;
}