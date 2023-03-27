import { AT } from './a.type';
import { SellerT } from './seller.type';
import {CityT} from "./city.type";
import {ProductCountT} from "./product.count.type";

export type UserT = AT & {
  email: string;
  phone: string;
  activated: boolean;
  name: string;
  count: ProductCountT
  sellers: SellerT[];
  cities: CityT[];
};
