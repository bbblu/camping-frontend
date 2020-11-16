export interface ProductGroupDetail {
  id: number;
  name: string;
  coverImage: string;
  city: string;
  price: string;
  borrowStartDate: Date;
  borrowEndDate: Date;
  productOwnerName: string;
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
  relatedLink: string;
  memo: string;
  imageArray: Image[];
}

export interface Image {
  id: number;
  url: string;
}
