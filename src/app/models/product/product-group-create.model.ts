export interface ProductGroupCreate {
  name: string;
  coverImage: string;
  cityName: string;
  cityAreaName: string;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  bankAccount: string;
  productArray: Product[];
}

export interface Product {
  type: number;
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
  url: string;
}
