import {PriceListApiT} from "./product.sellers.type";

export type UpdateRivalConfigT = {
  id: number
  price: number;
  minPrice: number;
  rivalSeller: PriceListApiT
}
