export interface IGerneralOptions {
  languageOptions: Array<string>;
  currencyOptions: Array<string>;
}

export interface IGeneralSettings {
  enterpriseName?: string;
  language?: string;
  currencyName?: string;
  //currencySymbol?: string;
  urlIG: string;
  urlFB: string;
  answers: Array<IAnswer>;
  phones?: Array<IPhoneSaving>;
  id: number;
  createdAt?: undefined;
}

//NOTE: THIS IS WHAT BACKEND EXPOSE
export interface IClientQuestions {
  id: number;
  questionCode: string;
  question: string;
  type: string;
  order: number;
  //createdAt: string;
  options: Array<IOption>;
}
export interface IOption {
  id: number;
  optionCode: string;
  option: string;
  order: number;
}

export interface IAnswer {
  id?: number;
  questionCode: string; //max length 16
  question: string; //max length 16
  questionOptionCode: string; //max length 16
  answer: string | any; //max length 512
  //updatedAt?: Date | string;
  //createdAt?: Date | string;
  compleateModel?: any;
}

export interface IPhones {
  id: number;
  phone: number;
  countryCode: number;
  type: string; //"MOB": Mobile phone | "TEL": Landline phone
  client: any;
  isWspMain: boolean;
  //createdAt: number
}
export interface IPhoneSaving {
  phone: number;
  countryCode: number;
  id?: number;
  type: string;
  isWspMain: boolean;
  compleateNumber?: string;
  //createdAt?: Date;
  //updatedAt?: Date
}
