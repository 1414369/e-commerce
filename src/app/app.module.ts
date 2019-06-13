import { UserService } from '@/_services';
import { MustMatchDirective, GlobalErrorHandler, ServerErrorInterceptor } from '@/_helper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

import { DataTableModule } from 'angular7-data-table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './client/navbar/navbar.component';

import { HomeComponent } from './client/home/home.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './client/check-out/check-out.component';
import { MyOrdersComponent } from './client/my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { SignInComponent } from './client/sign-in/sign-in.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoPermissionComponent } from './client/no-permission/no-permission.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { PickImageComponent, ConfirmModalComponent } from '@/_components';

import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductsComponent } from './client/products/products.component';
import { ProductFilterComponent } from './client/products/product-filter/product-filter.component';
import { ProductCardComponent } from './_components/product-card/product-card.component';
import { ProductQuantityComponent } from './_components/product-quantity/product-quantity.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ShoppingCartEffects } from './store/effects';
import { ShoppingCartSummaryComponent } from './client/check-out/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './client/check-out/shipping-form/shipping-form.component';
import { OrdersListComponent } from './_components/orders-list/orders-list.component';

@NgModule({
  declarations: [
    MustMatchDirective,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    SignInComponent,
    SignUpComponent,
    NoPermissionComponent,
    ProductFormComponent,
    PickImageComponent,
    ConfirmModalComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrdersListComponent,
  ],
  imports: [
    DataTableModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
    }),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ImageCropperModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ShoppingCartEffects]),

  ],
  providers: [
    UserService,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true }
  ],
  entryComponents: [
    PickImageComponent,
    ConfirmModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
