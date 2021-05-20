import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit {
  addUserForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _auth: AuthService) { }

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
      userType: "admin"
    };
    console.log('data', data);

    // Add Product Service is being called
    this._auth.createUser(data);
    this.addUserForm.reset()

  }
}
