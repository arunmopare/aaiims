import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";
import { MatSlideToggleModule, MatSnackBar, MatSnackBarModule } from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddProductComponent } from './add-product/add-product.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { QRCodeModule } from "angularx-qrcode";
import { AddUserComponent } from './add-user/add-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddProductComponent,
    ProductsOverviewComponent,
    ProductDetailsComponent,
    AddUserComponent,
    ManageUsersComponent,
  ],

  imports: [FormsModule, QRCodeModule, ReactiveFormsModule, CommonModule, DashboardRoutingModule, MatSlideToggleModule, FormsModule, MatSnackBarModule],
})
export class DashboardModule { }
