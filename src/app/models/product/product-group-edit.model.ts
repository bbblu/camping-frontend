export interface ProductGroupEdit {
  name: string;
  coverImage: string;
  city: City;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  productOwnerAccount: string;
  productOwnerName: string;
  contact: string;
  comment: number;
  productArray: Product[];
  bankAccount: string;
}

export interface City {
  id: number;
  name: string;
  areaName: string;
}

export interface Product {
  id: number;
  type: string;
  name: string;
  count: number;
  brand: string;
  appearance: string;
  useInformation: string;
  brokenCompensation: string;
  relatedLink: string;
  memo: string;
  imageArray: Image[];
}

export interface Image {
  id: number;
  url: string;
}
