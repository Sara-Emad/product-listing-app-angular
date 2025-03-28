// src/app/components/product-details/product-details.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { DiscountPipe } from '../../pipes/discount-calculator.pipe';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, DiscountPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  @Input() id?: string;
  
  product: Product | undefined;
  loading = true;
  error = false;
  currentImageIndex = 0;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    if (!this.id) {
      this.router.navigate(['/products']);
      return;
    }

    const productId = parseInt(this.id, 10);
    if (isNaN(productId)) {
      this.router.navigate(['/products']);
      return;
    }

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          this.loading = false;
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      error: (err) => {
        console.error('Error loading product details:', err);
        this.loading = false;
        this.error = true;
      }
    });
  }

  nextImage(): void {
    if (this.product && this.product.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage(): void {
    if (this.product && this.product.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }

  setImage(index: number): void {
    if (this.product && index >= 0 && index < this.product.images.length) {
      this.currentImageIndex = index;
    }
  }

  addToCart(product: Product) {
    // Create a new object with quantity to avoid modifying original product
    const cartProduct = {...product, quantity: 1};
    this.cartService.addToCart(cartProduct);
  }
}