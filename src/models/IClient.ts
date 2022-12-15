export interface IClient {
  id: number;
  tenancyId?: number;
  tenancyName?: string;
  name?: string;
  description?: string;
  businessType?: string;
  logo?: string;
  cover?: string;
  favicon?: any;
  currencyName?: string;
  currencySymbol?: string;
  urlIG?: string;
  urlFB?: string;
  brightness?: any;
  primary?: any;
  onPrimary?: any;
  secondary?: any;
  onSecondary?: any;
  error?: any;
  onError?: any;
  background?: any;
  onBackground?: any;
  surface?: any;
  onSurface?: any;
  createdAt?: any;
  answers?: IClientAnswer[];
  phones?: IClientPhonePhone[];
}

interface IClientAnswer {
  id: number;
  questionCode: string;
  question: string;
  questionOptionCode: string;
  answer: string;
  updatedAt: string;
  createdAt: string;
}

interface IClientPhonePhone {
  id: number;
  phone: number;
  countryCode: number;
  type: string;
  isWspMain: boolean;
  createdAt: string;
}
