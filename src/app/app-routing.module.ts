import { SignInComponent } from './client/sign-in/sign-in.component';
import { SignUpComponent } from './client/sign-up/sign-up.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { CheckOutComponent } from './client/check-out/check-out.component';
import { MyOrdersComponent } from './client/my-orders/my-orders.component';
import { HomeComponent } from './client/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './client/products/products.component';
import { ShoppingCartComponent } from './client/shopping-cart/shopping-cart.component';
import { OrderSuccessComponent } from './client/order-success/order-success.component';
import { NoPermissionComponent } from './client/no-permission/no-permission.component';
import { AuthGuard, AdminGuard, LoggedInGuard } from '@/_guards';
import { ProductFormComponent } from './admin/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'my/order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoggedInGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [LoggedInGuard] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'no-permission', component: NoPermissionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
