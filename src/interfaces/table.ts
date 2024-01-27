
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


export type MappedTableValues = IMappedUserTable[keyof IMappedUserTable]
export type MappedTableKeys =  keyof IMappedUserTable