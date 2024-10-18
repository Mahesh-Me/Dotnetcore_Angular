import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ServicesComponent } from './services.component';

const routes: Routes = [
  {
    path: '',
    component:ServicesComponent,
    children:[
      {
        path:'dashboard',
        component: DashboardComponent
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
    DashboardComponent
  ]
}
