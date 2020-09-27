import { City } from '@models/city/city.model';

export interface ProductType {
  id: string;
  name: string;
}

export interface ProductGroupFilter {
  type: ProductType[];
  city: City;
}
