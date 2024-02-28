
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