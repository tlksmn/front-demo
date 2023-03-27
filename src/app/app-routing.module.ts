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

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  {path: 'home', redirectTo: '/'},
  {path: 'sellers', component: SellerComponent, canActivate: [AuthGuard]},
  {path: 'seller/:id/products', component: ProductComponent, canActivate: [AuthGuard]},
  {path: '', component: MainComponent},
  {path: '**', component: NfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthModule, MainModule, NfModule, SellerModule, ProductModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
