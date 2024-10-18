import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ServicesComponent } from './services.component';


@NgModule({
  declarations: [ServicesRoutingModule.components,ServicesComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
