import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  // Dependency injection
  constructor(
    private fb: FormBuilder,
    private _productsService: ProductService
  ) { }



  ngOnInit() {
    this.addProductForm = this.fb.group({
      productName: [''],
      productDescription: [''],
      productImageUrl: [''],

    });
  }
  addProduct() {
    const data = {
      productName: this.addProductForm.get('productName').value,
      productDescription: this.addProductForm.get('productDescription').value,
      productImageUrl: this.addProductForm.get('productImageUrl').value,
    };
    console.log('data', data);

    // Add Product Service is being called
    this._productsService.addProduct(data);
    this.addProductForm.reset()

  }


}
