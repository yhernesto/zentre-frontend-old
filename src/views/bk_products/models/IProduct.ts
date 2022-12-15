export interface IProduct{
  id: number;
  sku: number;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
  name: string;
  ean? : number;
  categoryId?: number;
  pos: number;
  variantId? : number;
  createdAt: number;
}

export interface IProductImage{
  name: string,
  src: string
}

export interface IProductSave {
  name: string;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
}

export interface ICategory {
  id: number;
  category: string;
  description?: string;
  pos: number;
  isActive: boolean;
  createdAt: number;
}

export interface IVariantOptions{
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  variantId: number;
  price: number;
  variant: number
  createdAt: number;
}
export interface IVariant{
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: number
}


//NOTE: Announcements 
export interface IAnnouncements {
  screenCode?: string; //length max 7
  screenType?: string; //length max 4
  appCode?: string; //length max 4
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  initAt?: Date; //date format YYYY-MM-DD HH:mm:ss
  finishAt?: Date; //date format YYYY-MM-DD HH:mm:ss
  isActive: boolean;
}