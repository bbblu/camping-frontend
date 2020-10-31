export interface ProductGroup {
  name: string;
  coverImage: string;
  city: string;
  price: string;
  borrowStartDate: string;
  borrowEndDate: string;
  contact: string;
  comment: null;
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
  relatedLink: Link;
  memo: string;
  imageArray: Link[];
}

export interface Link {
  id: number;
  url: string;
}
