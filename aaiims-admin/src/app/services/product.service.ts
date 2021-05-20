import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  private api = environment.apiUrl;
  private _showProductsRequestsUrl = this.api + '/product/';
  private _addProductUrl = this.api + '/product/';
  private _deleteProduct = this.api + '/product/';
  private _getProductUrl = this.api + '/product/';

  // product reports
  private _showProductsReports = this.api + '/report/';


  private _getAllVendorCount = this.api + '/product/count';

  private _getProdImage = this.api + '/product/image/'

  private _deleteProductReport = this.api + '/report/';
  getProductCount() {
    return this.http.get(this._getAllVendorCount);
  }
  getProductImage(id) {
    return this.http.get(this._getProdImage + id);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(this._showProductsRequestsUrl);
  }
  getProduct(): Observable<any> {
    return this.http.get<any>(this._getProductUrl);
  }

  deleteProduct(reqId) {
    return this.http.delete(this._deleteProduct + reqId).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Product Deleted Successfully', 'OK');
    }, (error) => {
      console.log('Product not deleted', error);
      this.openSnackBar('Product Not Deleted', 'OK');
    });
  }
  addProduct(data) {
    return this.http.post(this._addProductUrl, data).subscribe((response: any) => {
      this.openSnackBar('Product Added Successfully', 'OK');

    }, (error) => {
      this.openSnackBar('Product not added', 'OK');
    });
  }
  getAllProductsReports(id: any): Observable<any> {
    return this.http.get<any>(this._showProductsReports + '/' + id);
  }
  deleteProductReport(reqId) {

    console.log('inside delete')
    return this.http.delete(this._deleteProductReport + reqId).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Report Deleted Successfully', 'OK');
    }, (error) => {
      console.log('Report not deleted', error);
      this.openSnackBar('Report Not Deleted', 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
