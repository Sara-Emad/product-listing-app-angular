

// src/app/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule ,DecimalPipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { DiscountPipe } from '../../pipes/discount-calculator.pipe';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink, DecimalPipe, DiscountPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(product: Product) {
    // Create a new object with quantity to avoid modifying original product
    const cartProduct = {...product, quantity: 1};
    this.cartService.addToCart(cartProduct);
  }
}