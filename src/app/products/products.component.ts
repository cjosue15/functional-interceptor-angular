import { Component, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { map } from 'rxjs';

import { ProductsService } from './data-access/products.service';
import { AuthService } from '../shared/data-access/auth.service';

export interface Product {
  id: number;
  title: string;
  category: string;
  stock: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  template: `
    <div
      class="h-[80px] bg-white border-b px-4 flex items-center justify-between"
    >
      <div class="font-bold text-3xl">
        <span>Products</span>
      </div>

      <button
        type="button"
        class="bg-green-500 h-[48px] px-8 rounded text-white font-bold cursor-pointer hover:bg-green-600"
        (click)="logOut()"
      >
        Log out
      </button>
    </div>
    <div class="mx-auto max-w-[600px] w-full px-4 my-[100px]">
      @for (product of products(); track product.id) {
        <div
          class="bg-white border shadow-md rounded p-8 mb-4 flex items-center justify-between"
        >
          <span>{{ product.title }}</span>
        </div>
      }
    </div>
  `,
  styles: ``,
})
export default class ProductsComponent {
  #authService = inject(AuthService);

  #routerService = inject(Router);

  #productsService = inject(ProductsService);

  products: Signal<Product[]> = toSignal(
    this.#productsService.getProducts().pipe(map((res: any) => res.products)),
  );

  logOut(): void {
    this.#authService.logOut();
    this.#routerService.navigate(['/auth']);
  }
}
