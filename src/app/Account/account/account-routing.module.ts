import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './account-detail/account-detail.component';

const routes: Routes = [
  {
    path:'',
    component:AccountComponent
  },
  {
    path:'Detail',
    component:AccountDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
