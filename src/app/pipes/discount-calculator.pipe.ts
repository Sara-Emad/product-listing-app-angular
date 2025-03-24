// src/app/pipes/discount.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discountPercentage?: number): number {
    if (!discountPercentage) {
      return price;
    }
    
    return price - (price * discountPercentage / 100);
  }
}