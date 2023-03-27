import { AT } from './a.type';
import { StateE } from '../../enum/state.enum';
import { SellerT } from './seller.type';
import { ProductT } from './product.type';
import { CityT } from './city.type';
import { PointT } from './point.type';
import { RivalConfigT } from './rival.config.type';

export type PointConfigT = AT & {
  available: boolean;
  status: StateE;
  preOrder: number;
  //---- relations ----
  seller: SellerT;
  product: ProductT;
  city: CityT;
  point: PointT;
  rival: RivalConfigT;
};
