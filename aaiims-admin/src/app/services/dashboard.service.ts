import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JoinUs } from '../interfaces/JoinUs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../interfaces/Product';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = environment.apiUrl;
  private _showProductsRequestsUrl = this.api + '/product/';
  private _addProductUrl = this.api + '/product/';
  private _deleteProduct = this.api + '/product/';
  private _addVendorUrl = this.api + '/admin/create-vendor';
  private _rejectVendorRequestUrl = this.api + '/admin/reject-vendor-request';
  // TODO :To add the respective link
  private _getAcceptedRequestsUrl = this.api + '/admin/get-all-accepted-request';
  private _getRejectedRequestsUrl = this.api + '/admin/get-all-rejected-request';
  private _getAllVendorCount = this.api + '/product/count'

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getProductCount() {
    return this.http.get(this._getAllVendorCount);
  }

  getAllProducts(): Observable<Product> {
    return this.http.get<Product>(this._showProductsRequestsUrl);
  }

  getAllAcceptedRequest(): Observable<JoinUs[]> {
    return this.http.get<JoinUs[]>(this._getAcceptedRequestsUrl);
  }

  getAllRejectedRequest(): Observable<JoinUs[]> {
    return this.http.get<JoinUs[]>(this._getRejectedRequestsUrl);
  }

  deleteProduct(reqId) {
    return this.http.delete(this._deleteProduct + reqId).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Request Deleted Successfully', 'OK');
    }, (error) => {
      console.log('Request not deleted', error);
      this.openSnackBar('Request Not Deleted', 'OK');
    });
  }
  addProduct(data) {
    return this.http.post(this._addProductUrl, data).subscribe((response: any) => {
      this.openSnackBar('Product Added Successfully', 'OK');
     
    }, (error) => {
      this.openSnackBar('Product not added', 'OK');
    });
  }

  rejectVendorRequest(data) {
    return this.http.post(this._rejectVendorRequestUrl, data).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Vendor Request Rejected Successfully', 'OK');
      location.reload();
    }, (error) => {
      this.openSnackBar('Cannot Reject Vendor Request', 'OK');
      console.log('Cannot Reject Vendor Request', error);
    });
  }

  addVendor(data) {
    return this.http.post(this._addVendorUrl, data).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('Vendor Added Successfully', 'OK');
      location.reload();
    }, (error) => {
      console.log('vendor Not added', error);
      this.openSnackBar('Vendor Cannot added', 'OK');
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
