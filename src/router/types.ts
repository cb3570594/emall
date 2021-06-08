export interface Menu {
  name: string;

  path: string;

  children?: Menu[];

  meta?: {
    [k: string]: any
  }
}
