import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _api = environment.apiUrl;


  private _loginAdminUrl = this._api + "/auth/signin";
  private _createUserUrl = this._api + "/auth/signup";
  private _showAllUsers = this._api + "/auth/all-users";
  private deleteUserUrl = this._api + "/auth/"


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private _router: Router) { }

  loginAdmin(admin) {
    return this.http.post<any>(this._loginAdminUrl, admin);
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(this._showAllUsers);
  }
  createUser(user) {
    return this.http.post<any>(this._createUserUrl, user).subscribe((res: any) => {
      this.openSnackBar('User Added Successfully', 'OK');

    }, (error) => {
      this.openSnackBar('User not added', 'OK');
    })
  }

  logoutAdmin() {
    localStorage.removeItem('token');
    this._router.navigate(['/login-admin']);
    // location.reload()
  }

  // logged in check
  isloggedIn() {
    console.log('Inside Isloggedin',)
    return !!localStorage.getItem('token');

  }

  getToken() {
    return localStorage.getItem('token');
  }


  deleteUser(reqId) {

    console.log('inside delete')
    return this.http.delete(this.deleteUserUrl + reqId).subscribe((response: any) => {
      console.log(response);
      this.openSnackBar('User Deleted Successfully', 'OK');
    }, (error) => {
      console.log('User not deleted', error);
      this.openSnackBar('User Not Deleted', 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
