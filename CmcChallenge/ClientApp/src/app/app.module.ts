import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './views/nav-menu/nav-menu.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { ProductItemComponent } from './views/product-list/product-item/product-item.component';
import { CartComponent } from './views/cart/cart.component';
import { OrderConfirmComponent } from './views/order-confirm/order-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ProductListComponent,
    ProductItemComponent,
    CartComponent,
    OrderConfirmComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ProductListComponent, pathMatch: 'full' },
      { path: 'cart', component: CartComponent },
      { path: 'order-confirm', component: OrderConfirmComponent },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
