export interface Rental {
  id: number;
  status: number;
  borrowRange: string;
  name: string;
  coverImage: string;
  areaName: string;
  price: string;
  seller: Seller;
  contact: string;
  rentalDate: string;
  detailArray: DetailArray[];
}

export interface Seller {
  nickName: string;
  email: string;
}

export interface DetailArray {
  status: number;
  type: string;
  name: string;
  count: number;
  brand: string;
  useInformation: string;
  brokenCompensation: string;
  imageArray: string[];
  relatedLinkArray: string[];
}
