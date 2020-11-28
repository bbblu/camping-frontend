export interface ProductGroup {
  id: number;
  name: string;
  coverImage: string;
  price: number;
  borrowStartDate: Date;
  borrowEndDate: Date;
  city: string;
  userName: string;
  productTypeArray: string[];
  comment: number;
}
