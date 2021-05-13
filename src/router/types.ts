
export interface Menu {
  name: string;

  icon?: string;

  path: string;

  disabled?: boolean;

  children?: Menu[];

  orderNo?: number;

  hideMenu?: boolean;

  [k: string]: any
}
