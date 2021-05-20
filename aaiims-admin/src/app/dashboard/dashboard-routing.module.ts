import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsOverviewComponent } from './products-overview/products-overview.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'products-overview', pathMatch: 'full' },
      { path: 'add-products', component: AddProductComponent },
      { path: 'products-overview', component: ProductsOverviewComponent },
      { path: 'products-details', component: ProductDetailsComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: 'manage-users', component: ManageUsersComponent },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
