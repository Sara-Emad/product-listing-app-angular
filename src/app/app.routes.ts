import { Routes } from '@angular/router';
import { ProductsListComponent } from '../app/pages/products-list/products-list.component';
import { ProductDetailsComponent } from '../app/pages/product-details/product-details.component';
import { LoginComponent } from '../app/pages/login/login.component';
import { RegisterComponent } from '../app/pages/register/register.component';
import { CartComponent } from '../app/pages/cart/cart.component';
import { NotFoundComponent } from '../app/pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent, title: 'Products' },
  { path: 'product/:id', component: ProductDetailsComponent, title: 'Product Details' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found' }
];