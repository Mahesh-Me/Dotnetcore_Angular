import { Component } from '@angular/core';
import { ServicesRoutingModule } from './services-routing.module';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [ServicesRoutingModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
