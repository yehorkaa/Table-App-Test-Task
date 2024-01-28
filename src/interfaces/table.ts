export interface IUserTable {
  [key: string]: string;
}

export interface IMappedUserTable {
  full_name: string;
  phone: string;
  email: string;
  age: number;
  experience: number;
  yearly_income: string;
  has_children: string;
  license_states: string;
  expiration_date: string;
  license_number: string;
  id: number | string;
  duplicate_with: string;
}

export interface ICSVTable {
  data: IMappedUserTable[];
  headers: MappedTableKeys[];
  error: Record<"message", string>;
}
export interface ICSVTableHeaders extends Omit<ICSVTable, "error" | "data"> {}
export interface ICSVTableBody extends Omit<ICSVTable, "error"> {}

export interface IisShowTable {
  data: IMappedUserTable[];
  error: string;
}

export type MappedTableValues = IMappedUserTable[keyof IMappedUserTable];
export type MappedTableKeys = keyof IMappedUserTable;
