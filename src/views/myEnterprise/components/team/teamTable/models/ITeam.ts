export interface ITeam {
  id: number;
  name: string;
  email?: string;
  jobTitle: string;
  isActive?: string;
  phone?: number;
  storeId?: number;
  countryCode: number;
  phoneType?: string;
  createdAt: string;
}

export interface ITeamSave {
  name: string;
  email: string;
  jobTitle: string;
  state?: boolean;
  phone?: number;
  phoneType?: string;
  storeId?: number;
  countryCode?: number;
  compleateNumber?: string;
}

export interface ITeamUpdate {
  storeId?: number;
  name?: string;
  email?: string;
  jobTitle?: string;
  phone?: number;
  countryCode?: number;
  phoneType?: string;
  isActive?: boolean;
}

export interface ILocalOptions {
  id: number;
  label: string;
}

export interface IJobTitle {
  code: string;
  title: string;
}
