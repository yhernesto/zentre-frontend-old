import type { ITeam } from "@/views/bk_settings/myEnterprise/components/team/teamTable/models/ITeam";

export interface IStore {
  id: number;
  store: string;
  description: string;
  address: string;
  isMain: boolean;
  latitude: number;
  longitude: number;
  isOpenAlways: boolean;
  createdAt?: Date;
  cityId?: number;
  placeLink?: string;
  address_components?: Array<IAddressComponent>;
  country?: string;
  phones?: Array<IPhone>;
  workers?: Array<ITeam>;
  compleateNumber?: string;
}

export interface IStoreSave {
  id?: number;
  store: string;
  description?: string;
  address_components?: Array<IAddressComponent>;
  placeLink?: string;
  address: string;
  isMain: boolean;
  latitude?: number;
  longitude?: number;
  isOpenAlways: boolean;
  phones?: Array<IPhone>;
  cityId?: number;
  compleateNumber?: string;
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: Array<string>;
}

export interface IPhone {
  phone: string;
  countryCode: string;
  type: string;
  isWspMain: boolean;
}

export interface ICountry {
  name: string;
  image: string;
}

export interface IPosition {
  position: {
    lat: number;
    lng: number;
  };
}
