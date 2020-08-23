export interface Type {
    id: string;
    name: string;
  }
  
  export interface City {
    nameArray: Array<string>;
    areaNameArray: Array<string>;
  }
  
  export interface ProductGroupFilter {
    type: Type[];
    city: City;
  }