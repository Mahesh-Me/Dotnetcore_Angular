import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { NumberOnlyDirective } from './directives/number-only.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    NumberOnlyDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    NumberOnlyDirective
  ]
})
export class SharedModule { }
