import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);
  private notificationSubject = new BehaviorSubject<string | null>(null);

  constructor() {}

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
      this.showNotification(`${product.title} quantity increased`);
    } else {
      this.cartItems.push({...product, quantity: 1});
      this.showNotification(`${product.title} added successfully`);
    }
    
    this.updateCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.id === productId);
    
    if (item) {
      item.quantity = Math.min(quantity, item.stock);
      
      if (item.quantity <= 0) {
        this.removeFromCart(productId);
      }
    }
    
    this.updateCart();
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getCartItemCount() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  private updateCart() {
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  getNotifications() {
    return this.notificationSubject.asObservable();
  }

  private showNotification(message: string) {
    this.notificationSubject.next(message);
    
    // Clear notification after 3 seconds
    setTimeout(() => {
      this.notificationSubject.next(null);
    }, 3000);
  }
}