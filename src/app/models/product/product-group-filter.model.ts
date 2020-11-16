import { City } from '@models/city/city.model';

export interface ProductGroupFilter {
  type: ProductType[];
  city: City;
}

export interface ProductType {
  id: string;
  name: string;
}
