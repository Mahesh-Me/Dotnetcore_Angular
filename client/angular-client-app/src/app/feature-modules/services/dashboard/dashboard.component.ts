import { Component } from '@angular/core';
import jQuery from 'jquery';
const $ = jQuery;
import * as bootstrap from "bootstrap";
import { CategoryMaster } from '../../../shared/models/categoryMasterDto';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CommonService } from '../../../core/services/common.service';
import { ServerResponse } from '../../../shared/models/server-response';
import { LoggerService } from '../../../core/services/logger.service';

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
  categoryList: CategoryMaster[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private _spinnerService: SpinnerService,
    private _commonService:CommonService,
    private _loggerService:LoggerService
  ){}

  ngOnInit(){
    this.getAllCategoryList();
  }

  openBudgetModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement);
    modal.show();
  }

  closeBudgetModal() {
    const modalElement = document.getElementById('exampleModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    modal.hide();
  }
  getEmoji(iconLink: string): string {
    const iconMap: { [key: string]: string } = {
      'fa-cutlery': '🍽️',
      'fa-money': '💵',
      'fa-book': '📚',
      'fa-medikit': '🏥',
      'fa-shopping-cart': '🛒',
      'fa-mobile': '📱',
      'fa-bus': '🚌'
    };
    return iconMap[iconLink] || ''; // Return the corresponding emoji or empty if not found
  }

  getAllCategoryList(){
    this._spinnerService.showLoader();
    this._commonService.getAllCategoryList().subscribe({
      next: (res:any) => {
        if(res != null){
          this.categoryList = res;
          this._spinnerService.hideLoader();
        }
        this._spinnerService.hideLoader();
      },
      error: (err) => {
        if(err){
          this._loggerService.logError(err.message);
          this._spinnerService.hideLoader();
        }
      },
      complete: () => {
        this._spinnerService.hideLoader();
      }
    })
  }
}
