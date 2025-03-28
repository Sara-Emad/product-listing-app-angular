// src/app/pages/cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.getTotalPrice();
    });
  }

  incrementQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, (product.quantity || 0) + 1);
  }

  decrementQuantity(product: Product) {
    this.cartService.updateQuantity(product.id, (product.quantity || 0) - 1);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}