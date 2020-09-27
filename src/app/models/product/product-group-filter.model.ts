export interface ProductType {
  id: string;
  name: string;
}

export interface City {
  nameArray: Array<string>;
  areaNameArray: Array<string>;
}

export interface ProductGroupFilter {
  type: ProductType[];
  city: City;
}
