export interface Rental {
  id: number;
  status: number;
  borrowRange: string;
  borrowStartDate: string;
  borrowEndDate: string;
  name: string;
  coverImage: string;
  areaName: string;
  price: string;
  seller: Seller;
  contact: string;
  rentalDate: string;
  detailArray: DetailArray[];
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

export interface Seller {
  nickName: string;
  email: string;
}
