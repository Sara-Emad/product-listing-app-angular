// src/app/components/product-card/product-card.component.ts
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';  // Add CommonModule and DecimalPipe
import { Product } from '../../models/product';
import { DiscountPipe } from '../../pipes/discount-calculator.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule, DecimalPipe, DiscountPipe],  // Add CommonModule and DecimalPipe
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Product;
}