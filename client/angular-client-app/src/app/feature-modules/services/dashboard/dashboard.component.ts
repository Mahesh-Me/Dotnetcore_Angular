import { Component } from '@angular/core';
import jQuery from 'jquery';
const $ = jQuery;
import * as bootstrap from "bootstrap";

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isBudgetModalOpen = false;
  userName: string = 'Mahesh';
  budgetAmount:string='';


  openBudgetModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement);
    modal.show();
  }

  closeBudgetModal() {
    const modalElement = document.getElementById('exampleModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.hide();
  }
}
