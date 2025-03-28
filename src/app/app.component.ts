// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartService } from './services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,CommonModule],
  template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
    
    <div *ngIf="notification" class="notification">
      {{ notification }}
    </div>
  `,
  styles: [`
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      z-index: 1000;
      animation: fadeIn 0.5s, fadeOut 0.5s 2.5s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'products-app';
  notification: string | null = null;
  private notificationSubscription: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.notificationSubscription = this.cartService.getNotifications()
      .subscribe(message => {
        this.notification = message;
      });
  }

  ngOnDestroy() {
    this.notificationSubscription?.unsubscribe();
  }
}




