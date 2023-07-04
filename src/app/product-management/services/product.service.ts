import { Injectable } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { Product } from '../model/product.model';
import { Observable, of, map, tap } from 'rxjs';

export interface Response {
  products: Product[];
}

@Injectable()
export class ProductService {
  constructor(private dataService: DataService) {}

  getAllProducts(): Observable<Product[]> {
    if (this.haveFetched()) {
      const PRODUCTS = this.getProductsFromLocalStorage();
      return of(PRODUCTS);
    } else {
      return this.getProductsFromAPI().pipe(
        tap((response) => {
          localStorage.setItem('products', JSON.stringify(response));
        })
      );
    }
  }

  private haveFetched(): boolean {
    const PRODUCTS = this.getProductsFromLocalStorage();
    if (PRODUCTS.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  private getProductsFromLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem('products') || '[]');
  }

  private getProductsFromAPI(): Observable<Product[]> {
    const URL = 'products';
    return this.dataService.get<Response>(URL).pipe(
      map((response) => {
        return response.products;
      })
    );
  }
  
}
