import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './services.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {
    path: '',
    component:ServicesComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'dashboard',
        component: DashboardComponent
      },
      {
        path:'transaction-history',
        component: TransactionHistoryComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { 
  static components = [
    DashboardComponent,
    TransactionHistoryComponent
  ]
}
