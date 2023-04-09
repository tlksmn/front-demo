import {Component, OnDestroy} from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  map,
  NEVER,
  Observable,
  switchMap,
  throwError
} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductListResponseApiT, ProductService} from "../../common/service/product.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnDestroy {
  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {}

  ngOnDestroy() {
    this.currentPageStream.unsubscribe()
    this.perPageStream.unsubscribe()
    this.filterStream.unsubscribe()
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
    debounceTime(1400),
    switchMap(([currentPage, perPage, sellerId, filterValue]) => {
      if (isNaN(sellerId)) {
        return throwError('Продавец не найден')
      }
      return this.productService.getProductList(sellerId, currentPage, perPage, filterValue)
    }),
    catchError((e) => {
      this.messageService.add({detail: e.error.message, summary: e.error.statusCode, severity: 'error'})
      this.router.navigate(['sellers']).then()
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

  onFilterUpdate(status: string) {
    this.filterStream.next(status)
  }
}
