import { UserService } from '@/_services';
import { MustMatchDirective, GlobalErrorHandler, ServerErrorInterceptor } from '@/_helper';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './client/navbar/navbar.component';

import { HomeComponent } from './client/home/home.component';
import { ProductsComponent } from './client/products/products.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './client/check-out/check-out.component';
import { OrderSuccessComponent } from './client/order-success/order-success.component';
import { MyOrdersComponent } from './client/my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { SignInComponent } from './client/sign-in/sign-in.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoPermissionComponent } from './client/no-permission/no-permission.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductListComponent } from './_components/product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { PickImageComponent, ConfirmModalComponent } from '@/_components';

@NgModule({
  declarations: [
    MustMatchDirective,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    SignInComponent,
    SignUpComponent,
    NoPermissionComponent,
    ProductFormComponent,
    PickImageComponent,
    ProductListComponent,
    ConfirmModalComponent,
  ],
  imports: [
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
