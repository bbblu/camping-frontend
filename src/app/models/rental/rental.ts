export interface Rental {
  id: number;
  status: number;
  borrowRange: string;
  borrowStartDate: Date;
  borrowEndDate: Date;
  name: string;
  coverImage: string;
  areaName: string;
  price: string;
  seller: Seller;
  contact: string;
  rentalDate: Date;
  detailArray: Detail[];
}

export interface Seller {
  nickName: string;
  email: string;
}

export interface Detail {
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
