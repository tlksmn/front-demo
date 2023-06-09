import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthComponent} from "./auth/auth.component";
import {AuthModule} from "./auth/auth.module";
import {MainComponent} from "./main/main.component";
import {MainModule} from "./main/main.module";
import {NfComponent} from "./nf/nf.component";
import {NfModule} from "./nf/nf.module";
import {SellerModule} from "./seller/seller.module";
import {SellerComponent} from "./seller/seller.component";
import {AuthGuard} from "../common/guard/auth.guard";
import {ProductComponent} from "./product/product.component";
import {ProductModule} from "./product/product.module";
import {ProductIdModule} from "./product/product-id/product-id.module";
import {AdminComponent} from "./admin/admin.component";
import {AdminModule} from "./admin/admin.module";
import {MeModule} from "./me/me.module";
import {MeComponent} from "./me/me.component";

const routes: Routes = [
  {path: 'auth', component: AuthComponent, title: 'biy.kz | Авторизация'},
  {path: 'home', redirectTo: '/'},
  {path: 'me', component: MeComponent, canActivate: [AuthGuard], title: 'biy.kz | Личный кабинет пользователя'},
  {path: 'sellers', component: SellerComponent, canActivate: [AuthGuard], title: 'biy.kz | Продавцы'},
  {path: 'seller/:id/products', component: ProductComponent, canActivate: [AuthGuard], title: 'biy.kz | Товары'},
  {path: 'ruby/admin', component: AdminComponent},
  {path: '', component: MainComponent, title: 'Главная страница'},
  {path: '**', component: NfComponent, title: 'Ooops! Ошибка'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, MainModule, MeModule, NfModule, SellerModule, ProductModule, ProductIdModule, AdminModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
