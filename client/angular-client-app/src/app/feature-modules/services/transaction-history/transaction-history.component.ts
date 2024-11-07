import { Component } from '@angular/core';
import { ExpenseDetailsDto, UpdateExpenseDetailsDto } from '../../../shared/models/budgetDetailsDto';
import { TransactionService } from '../../../core/services/transaction.service';
import { CurrentUserService } from '../../../core/authentication/currentuser.service';
import { SpinnerService } from '../../../core/services/spinner.service';
import { LoggerService } from '../../../core/services/logger.service';
import { CategoryMaster } from '../../../shared/models/categoryMasterDto';
import * as bootstrap from "bootstrap";
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-transaction-history',
  standalone: false,
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.css'
})
export class TransactionHistoryComponent {

  expenseListOfUser:ExpenseDetailsDto[] = [];
  selectedMonth: string = '';
  categoryList: CategoryMaster[] = [];
  selectExpenseCategoryId: number | null = null;
  expenseAmount !: number;
  isEditMode:boolean = false;
  item:UpdateExpenseDetailsDto = new UpdateExpenseDetailsDto();

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];


  constructor(
    private _transactionService:TransactionService,
    private _currentUserService:CurrentUserService,
    private _spinnerService:SpinnerService,
    private _loggerService:LoggerService,
    private _commonService:CommonService
  ){}

  ngOnInit(){
    this.getAllCategoryList();
    const currentMonthIndex = new Date().getMonth();
    this.selectedMonth = this.months[currentMonthIndex];
    this.getAllExpenseDetailsOfUser();
  }

  getAllExpenseDetailsOfUser(){
    let emailId = this._currentUserService.getEmailId;
    if(emailId != null || emailId != undefined){
      this._spinnerService.showLoader();
      this._transactionService.getTheListofExpenseOfAUser(emailId,this.selectedMonth).subscribe({
        next: (res:any) => {
          if(res != null){
            this.expenseListOfUser = res;
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
  getCategoryName(categoryId: string): string {
    const iconMap: { [key: string]: string } = {
      '1': 'Food',
      '2': 'Bills',
      '3': 'Education',
      '4': 'Health',
      '5': 'Shopping',
      '6': 'Telephone',
      '7': 'Transporation'
    };
    return iconMap[categoryId] || ''; // Return the corresponding emoji or empty if not found
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
  openExpenseModal() {
    const modal = new bootstrap.Modal(document.getElementById('expenseModal') as HTMLElement);
    modal.show();
  }
  
  closeExpenseModal() {
    const modalElement = document.getElementById('expenseModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
  this.isEditMode = false;
  this.expenseAmount = 0;
  this.selectExpenseCategoryId = null;
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
      error: (err:any) => {
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
  onEditClicked(item:any){
    this.expenseAmount = item.expenseAmount;
    this.selectExpenseCategoryId = item.categoryId;
    this.isEditMode = true;
    this.openExpenseModal();
    this.item.id = item.id;
  }
  updateBudgetDetails(){
    this.item.expenseAmount = this.expenseAmount;
    this.item.categoryId = this.selectExpenseCategoryId;
    this._spinnerService.showLoader();
    this._transactionService.updateBudgetDetailsForUser(this.item).subscribe({
      next: (res:any) => {
        if(res != null){
          this._spinnerService.hideLoader();
          this._loggerService.logSuccess("Updated Successfully");
          this.closeExpenseModal();
          this.getAllExpenseDetailsOfUser();
          this.isEditMode = false;
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
