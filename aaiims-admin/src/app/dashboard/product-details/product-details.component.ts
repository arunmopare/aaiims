import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  prodImage: any = { productImageUrl: '' };
  public paramProductId: string = '';
  public ParamProductImageUrl: string = '';
  public productName: string = '';

  public productReports: any = [];

  constructor(private activatedRoute: ActivatedRoute, private _productService: ProductService) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.paramProductId = params['productId'];

      console.log("paramVendorId", this.paramProductId); // Print the parameter to the console.
    });

  }
  deleteProductReport(reqId: any) {
    this._productService.deleteProductReport(reqId);

    console.log('deleting',)
    // alert('Request deletion in process...');
    location.reload();
  }


  ngOnInit() {

    this._productService.getProductImage(this.paramProductId).subscribe(url => {
      console.log('count', url)
      this.prodImage = url
      this.ParamProductImageUrl = this.prodImage.productImageUrl;
      this.productName = this.prodImage.productName;
      console.log('ParamProductImageUrl', this.prodImage.productImageUrl)
      console.log('this.prodImage', this.prodImage)

      // console.log("All Products",this.products);
    });

    this._productService.getAllProductsReports(this.paramProductId).subscribe(data => {
      this.productReports = data;
      console.log('data', data)
      console.log(this.productReports);
    });
  }

}
