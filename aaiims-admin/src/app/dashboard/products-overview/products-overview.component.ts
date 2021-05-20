import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-overview',
  templateUrl: './products-overview.component.html',
  styleUrls: ['./products-overview.component.css']
})
export class ProductsOverviewComponent implements OnInit {
  product_count: any = { count: 0 };

  public products: any = [];

  constructor(private _productService: ProductService, private router: Router) { }

  ngOnInit() {


    this._productService.getProductCount().subscribe(count => {
      console.log('count', count)
      this.product_count = count
      // console.log("All Products",this.products);
    });

    this._productService.getAllProducts().subscribe(data => {
      this.products = data;
      console.log('data', data)
      console.log(this.products);
    });

  }

  deleteProduct(reqId: any) {
    this._productService.deleteProduct(reqId);
    // alert('Request deletion in process...');
    location.reload();
  }
  navigate(_id) {
    console.log("Navigating");

    this.router.navigate(['/products-details'], { queryParams: { productId: _id } });
  }
}
