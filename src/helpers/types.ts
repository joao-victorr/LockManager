

export type User = {
  id: string;
  name: string;
  email: string;
}

export type Access = {
  name: string;
  image: Buffer;
  unit: Array<{
    id: string;
    department: number;
  }>;
};

export type DeletData = {
  id: string;
  unidade: Array<{
    id: string;
    code: number;
  }>
}
export type DeletDepartment = {
  id: string;
  DepartmentLock: Array<{
    code: number;
    id_lock: string;
  }>
}

export type UnitData = {
  name: String,
  ip: String,
  session: String
}

export type DataUnitCode = {
  id: string;
  code: number;
}

export type UnitSession = Array<{
  id: String,
  ip: String,
  session: String
}>;

export type Units = Array<{
  id: String
  name: string,
  ip: string,
  user: string,
  password: string
}>;

export type Department = {
  name: string,
  units: Array<{
    id: string
  }>
}
