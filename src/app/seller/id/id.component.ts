import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {SellerT} from "../../../common/type/base/seller.type";
import {catchError, NEVER, Subscription, tap} from "rxjs";
import {SellerService} from "../../../common/service/seller.service";
import {AuthService} from "../../../common/service/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss']
})
export class IdComponent implements OnInit, OnDestroy {
  @Input('seller') seller!: SellerT;
  edited: boolean = false;
  sellerForm!: FormGroup;
  sellerUpdateForm!: FormGroup;
  subscriptions$: Subscription[] = [];
  changeMode: boolean = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly sellerService: SellerService,
    readonly authService: AuthService,
    private readonly messageService: MessageService
  ) {
  }

  ngOnInit() {
    this.sellerForm = this.formBuilder.group({
      preOrderStatus: new FormControl(this.seller.preOrderStatus),
      rivalStatus: new FormControl(this.seller.rivalStatus),
      demotion: new FormControl(this.seller.demotion),
      promotion: new FormControl(this.seller.promotion)
    });
    this.sellerUpdateForm = this.formBuilder.group({
      email: new FormControl(this.seller.email),
      password: new FormControl(this.seller.password)
    });
    if (!this.authService.user.activated) {
      for (const control in this.sellerForm.controls) {
        this.sellerForm.controls[control].disable()
      }
    }
    const subscription = this.sellerForm.valueChanges.pipe(
      tap(() => {
        this.edited = true
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((sub) => {
      sub.unsubscribe()
    })
    this.subscriptions$ = []
  }

  async switchToSeller() {
    await this.router.navigate(['seller', this.seller.id, 'products']);
  }

  submitForm() {
    const subscription = this.sellerService.updateSeller({...this.sellerForm.value, id: this.seller.id}).pipe(
      tap((seller) => {
        this.messageService.add({severity: 'success', summary: 'Продавец', detail: 'Успешно обновлено!'})
        Object.assign(this.seller, seller)
        this.edited = false;
      })
    ).subscribe()
    this.subscriptions$.push(subscription)
  }

  reintegrateSeller() {
    if (confirm('Вы пытаетесь синхронизировать данные продавца с данными из kaspi. Вы уверены? ')) {
      const subscription = this.sellerService.reintegrateSeller(this.seller.id).pipe(
        tap((message) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Интеграция',
            detail: 'Реинтеграция начаната успешно!'
          })
          this.messageService.add({severity: 'info', summary: 'Интеграция', detail: 'Подождите 2-3 минуты'})
        }),
        catchError((e) => {
          this.messageService.add({severity: 'error', summary: 'Интеграция', detail: e.message})
          return NEVER
        })
      ).subscribe();

      this.subscriptions$.push(subscription);
    }
  }

  deleteSeller() {
    if (confirm('Вы пытаетесь удалить продавца. Вы уверены? ')) {
      const subscription = this.sellerService.deleteSeller(this.seller.id)
        .pipe(
          tap((e) => {
            this.messageService.add({severity: 'success', summary: 'Продавец', detail: 'Продавец удален успешно!'});
          }),
          catchError((e) => {
            this.messageService.add({severity: 'error', summary: 'Интеграция', detail: e.message})
            return NEVER
          })
        ).subscribe();
      this.subscriptions$.push(subscription);
    }
  }

  updateSellerOpenModal() {
    if (confirm('Вы пытаетесь обновить данные продавца. Вы уверены ?'))
      this.showModalToEdit()
    this.messageService.add({severity: 'success', summary: 'Продавец', detail: 'Продавец изменен успешно!'});
  }

  updateSeller(){
    console.log(this.sellerUpdateForm.value)
  }

  private showModalToEdit() {
    console.log(this.seller)
    this.changeMode = true;
  }
}
