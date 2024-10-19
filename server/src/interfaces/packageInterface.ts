import { Product } from "./productInterface";

export interface Package {
    items: Product[];
    totalWeight: number;
    totalPrice: number;
    courierPrice: number;
  }