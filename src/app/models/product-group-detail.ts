export interface ProductGroup {
  name: string;
  city: string;
  price: string;
  borrowDateRange: string;
  contactInformation: string;
  productArray: Array<Product>;
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
  imageArray: Array<Image>;
  relatedLinkArray: Array<RelatedLink>;
}

export interface Image {
  id: number;
  url: string;
}

export interface RelatedLink {
  id: number;
  url: string;
}
