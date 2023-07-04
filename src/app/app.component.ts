import { Component } from '@angular/core';
import { ProductService } from './product-management/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Product-Manager';

  constructor(private productService:ProductService){
    productService.getAllProducts().subscribe(response=>{
      console.log(response);
      
    })
  }
}
