import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {ProductT} from "../type/base/product.type";

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
}

export type ProductListResponseApiT = {
  page: number
  take: number
  total: number
  list: ProductT[]
}
