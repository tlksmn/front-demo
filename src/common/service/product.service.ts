import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {ProductT} from "../type/base/product.type";
import {UpdateRivalConfigT} from "../type/api/product/update.rival.config.type";
import {UpdatePointConfigT} from "../type/api/product/update.point.config.type";
import {RivalConfigT} from "../type/base/rival.config.type";
import {PointConfigT} from "../type/base/point.config.type";

@Injectable()
export class ProductService{
  constructor(private readonly apiService: ApiService) {}

  getProductList(sellerId: number, page: number, take: number, filterValue: string){
    return this.apiService.get<ProductListResponseApiT>(`product/list/seller/${sellerId}`, {
      params: {
        page,
        take,
        available: filterValue.length > 2 ? filterValue : ''
      }
    })
  }

  updateRival(data:UpdateRivalConfigT){
    return this.apiService.post<RivalConfigT, UpdateRivalConfigT>('product/update/rival', data, null)
  }

  updatePoint(data: UpdatePointConfigT){
    return this.apiService.post<PointConfigT, UpdatePointConfigT>('product/update/point', data, null)
  }
}

export type ProductListResponseApiT = {
  page: number
  take: number
  total: number
  list: ProductT[]
}
