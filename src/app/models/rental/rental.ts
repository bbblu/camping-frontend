export interface Rental {
  id: number;
  status: number;
  productGroupId: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  name: string;
  coverImage: string;
  areaName: string;
  price: number;
  user: User;
  rentalDate: Date;
  detailArray: Detail[];
}

export interface User {
  account: string;
  nickName: string;
  email: string;
  cellPhone: string;
}

export interface Detail {
  status: number;
  type: string;
  name: string;
  count: number;
  brand: string;
  useInformation: string;
  brokenCompensation: string;
  relatedLink: string;
  imageArray: string[];
}
