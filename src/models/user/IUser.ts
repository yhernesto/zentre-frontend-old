export interface IProfile {
  _id: string;
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  language?: string;
  password: string;
  photo: string | null;
  tenancies: Array<ITenancies>;
  country: string;
}

export interface ITenancies {
  planWCOM?: number;
  planACOM?: number;
  name?: string;
  logo?: string;
  isActive?: boolean;
  description?: string;
  createdAt?: string;
}

export interface IProfileForEditing {
  firstName: string;
  lastName: string;
  country: string;
  userName: string;
  language?: string;
  rol?: string;
}

export interface IProfileForEditigCredentials {
  oldPassword: string;
  newPassword: string;
  email?: string;
}
