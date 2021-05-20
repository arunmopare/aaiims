import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  showProgressSpinner = false;
  disableLoginButton = false;
  loginData = { email: '', password: '' };

  constructor(private _auth: AuthService, private _router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  loginAdmin() {
    this.disableLoginButton = true;
    this.showProgressSpinner = true;
    this._auth.loginAdmin(this.loginData).subscribe(res => {
      this.disableLoginButton = false;
      this.showProgressSpinner = false;
      console.log(res)
      localStorage.setItem('token', res.token)
      this.openSnackBar('Login Successfull', 'OK');
      // alert('Login Successfull');
      this._router.navigate(['/dashboard/products-overview'])
    }, (error) => {
      this.disableLoginButton = false;
      this.showProgressSpinner = false;
      console.log('Wrong Credentials', error);
      // alert('Cannot Reject Aadhar Updation Request');
      this.openSnackBar('Wrong Credentials', 'OK');
    }
    )
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }
}
