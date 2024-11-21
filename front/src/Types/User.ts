import type { Device } from "./Device";


export type User = {
  id?: string;
  name: string;
  image: ArrayBuffer;
  device: Array<Device>
}