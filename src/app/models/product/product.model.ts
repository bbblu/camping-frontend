export interface ProductGroup {
  id: string;
  name: string;
  city: string;
  coverImage: string;
  price: string;
  borrowStartDate: string;
  borrowEndDate: string;
  contact: string;
  comment: number;
  productArray: Product[];
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
  memo: string;
  imageArray: Image[];
}

export interface Image {
  id: number;
  url: string;
}
