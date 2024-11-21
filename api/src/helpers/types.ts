

export type UserWeb = {
  id: string;
  name: string;
  email: string;
}

export type Users = {
  name: string;
  image: Buffer;
  devices: Array<{
    id_device: string;
  }>;
};

export type DeletData = {
  id: string;
  devices: Array<{
    id_device: string;
  }>
}
export type DeletGroup = {
  id: string;
  GroupsDevice: Array<{
    id_device: string;
  }>
}

export type DeviceData = {
  name: string,
  ip: string,
  session: string
}

export type DataDeviceCode = {
  id: string;
  code: number;
}

export type DataTimesDeviceCode = {
  id: string;
  codeZones: number;
  codeSpans: number;
}

export type DevicesSession = {
  id: string,
  ip: string,
  session: string
};

export type Devices = {
  id: string;
  name: string;
  ip: string;
  status: boolean;
  users: string;
  password: string;
};

export type Group = {
  name: string,
  devices: Array<{
    id: string
  }>
}


export type Times = {
  name: string,
  devices: Array<{
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
  GroupsDevices: Array<{code: number}>,
  TimeZonesDevices: Array<{code: number}>
}

export type DataUserGroup = {
  id_user: string
  devices: Array<{
    id_device: string
    gruops: Array<{
      id: string
    }>
  }>
}

export type UserGroup = {
  codeUserDevice: number,
  device: {
    id_device: string;
    codeGruops: Array<{
      code: number;
      id_groups: string
    }>
  }
}
