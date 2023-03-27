import { Component } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  NEVER,
  Observable, Subject,
  switchMap,
  throwError
} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../../common/notification/notification.service";
import {SellerService} from "../../common/service/seller.service";
import {ProductListResponseApiT, ProductService} from "../../common/service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    private readonly sellerService: SellerService,
  ) {
  }

  defaultPerPage: number[] = [10, 25, 50, 75, 100];
  defaultFilter: string[] = ['', 'true', 'false']
  defaultFilterString: string[] = ['все', 'в наличии', 'не в наличии']
  currentPageStream: BehaviorSubject<number> = new BehaviorSubject(1);
  perPageStream: BehaviorSubject<number> = new BehaviorSubject(10);
  filterStream: BehaviorSubject<string> = new BehaviorSubject(' ');

  requestProducts$: Observable<ProductListResponseApiT> = combineLatest(
    this.currentPageStream,
    this.perPageStream,
    this.route.paramMap.pipe(
      map((paramMap) => +paramMap.get('id')!)),
    this.filterStream
  ).pipe(
    debounceTime(800),
    switchMap(([currentPage, perPage, sellerId,filterValue]) => {
      console.log(currentPage, perPage, sellerId, filterValue)
      if (isNaN(sellerId)) {
        return throwError('Продавец не найден')
      }
      return this.productService.getProductList(sellerId, currentPage, perPage, filterValue)
    }),
    catchError(e => {
      this.notificationService.error(e)
      return NEVER
    })
  );

  onCurrentPageUpdate(nextPage: number) {
    if (nextPage > 0) {
      return this.currentPageStream.next(nextPage)
    }
  }

  onPerPageUpdate(perPage: number) {
    return this.perPageStream.next(perPage);
  }

  onFilterUpdate(status: string){
    this.filterStream.next(status)
  }
}
