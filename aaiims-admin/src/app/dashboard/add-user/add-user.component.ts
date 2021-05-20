import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addUserForm: FormGroup;


  constructor(private fb: FormBuilder,
    private _auth: AuthService) {

  }

  ngOnInit() {
    this.addUserForm = this.fb.group({
      email: [''],
      password: [''],

    });

  }
  addUser() {
    const data = {
      email: this.addUserForm.get('email').value,
      password: this.addUserForm.get('password').value,
      userType: "user"
    };
    console.log('data', data);

    // Add Product Service is being called
    this._auth.createUser(data);
    this.addUserForm.reset()

  }

}
