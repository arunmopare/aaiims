import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  public users: any = [];

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit() {
    this._auth.getAllUsers().subscribe(data => {
      this.users = data;
      console.log('data', data)
      console.log(this.users);
    });
  }
  deleteUser(reqId: any) {
    this._auth.deleteUser(reqId);
    // alert('Request deletion in process...');
    location.reload();
  }


}
