import { Component } from '@angular/core';
import jQuery from 'jquery';
const $ = jQuery;
import * as bootstrap from "bootstrap";
import { CategoryMaster } from '../../../shared/models/categoryMasterDto';
import { SpinnerService } from '../../../core/services/spinner.service';
import { CommonService } from '../../../core/services/common.service';
import { LoggerService } from '../../../core/services/logger.service';
import { BudgetDetailsDto, ExpenseDetailsDto, updateBudgetDetailsDto } from '../../../shared/models/budgetDetailsDto';
import { CurrentUserService } from '../../../core/authentication/currentuser.service';
import { Router } from '@angular/router';
import { TransactionService } from '../../../core/services/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  isBudgetModalOpen = false;
  userName: string = 'Mahesh';
  budgetAmount !:number;
  categoryList: CategoryMaster[] = [];
  selectedCategoryId: number | null = null;
  budgetDetailsObj: BudgetDetailsDto = new BudgetDetailsDto();
  expenseDetailsObj: ExpenseDetailsDto = new ExpenseDetailsDto();
  selectedMonth: string = '';
  budgetList:BudgetDetailsDto[] = [];
  isEditMode:boolean = false;
  item:updateBudgetDetailsDto = new updateBudgetDetailsDto();
  expenseAmount!: number;
  selectExpenseCategoryId:number | null = null ;
  totalPlannedAmount!: number;
  totalSpentAmount !: number;
  expenseListOfUser:ExpenseDetailsDto[] = [];

  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(
    private _spinnerService: SpinnerService,
    private _commonService:CommonService,
    private _loggerService:LoggerService,
    private _currentUserService: CurrentUserService,
    private _router:Router,
    private _transactionService:TransactionService
  ){}

  ngOnInit(){
    this.getAllCategoryList();
    const currentMonthIndex = new Date().getMonth();
    this.selectedMonth = this.months[currentMonthIndex];
    this.getAllBudgetListByUserForOneMonth();
    this.getAllExpenseDetailsOfUser();
  }

  openBudgetModal() {
    const modal = new bootstrap.Modal(document.getElementById('exampleModal') as HTMLElement);
    modal.show();
  }

  closeBudgetModal() {
    const modalElement = document.getElementById('exampleModal') as HTMLElement;
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
  this.isEditMode = false;
  this.budgetAmount = undefined!;
  this.selectedCategoryId = null;
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
  validateTheBudgetDetails(): boolean{
    if(this.budgetAmount == 0 || this.budgetAmount < 0 || this.budgetAmount == undefined){
      this._loggerService.logError("Invalid input for Amount.");
      $('#amount').get(0)?.focus();
      return false;
    }
    if(this.selectedCategoryId == 0 || this.selectedCategoryId == undefined){
      this._loggerService.logError("Please Select a Category.");
      return false;
    }
    return true;
  }
  saveBudgetDetailsForMonth(){
    if(this.validateTheBudgetDetails()){
      this._spinnerService.showLoader();
      this.budgetDetailsObj = new BudgetDetailsDto();
      this.budgetDetailsObj.categoryId = this.selectedCategoryId;
      this.budgetDetailsObj.expenseLimit = this.budgetAmount;
      this.budgetDetailsObj.emailId = this._currentUserService.getEmailId!;
      this.budgetDetailsObj.month = this.selectedMonth;

      if(this.budgetDetailsObj.emailId == '' || this.budgetDetailsObj.emailId == undefined){
        this._loggerService.logError("An Error Occured...");
        this._spinnerService.hideLoader();
        this._router.navigate(['/auth/login']);
      }
      else{
        this._transactionService.saveBudgetDetailsOfUser(this.budgetDetailsObj).subscribe({
          next: (res:any) => {
            if(res && res != null){
              this._loggerService.logSuccess("Budget Saved Successfully");
              this._spinnerService.hideLoader();
              this.closeBudgetModal();
              this.getAllBudgetListByUserForOneMonth();
              this.budgetAmount = 0;
              this.selectedCategoryId = null;

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
  }
  getAllBudgetListByUserForOneMonth(){
    let emailId = this._currentUserService.getEmailId;
    if(emailId != null || emailId != undefined){
      this._spinnerService.showLoader();
      this._transactionService.getAllBudgetListForUser(emailId,this.selectedMonth).subscribe({
        next: (res:any) => {
          if(res != null){
            this.budgetList = res.filter((i: { expenseLimit: number; }) => i.expenseLimit != 0);
            this._spinnerService.hideLoader();
            this.totalPlannedAmount = this.budgetList.reduce((total, item) => total + item.expenseLimit, 0)
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
  onEditClicked(item:any){
    this.budgetAmount = item.expenseLimit;
    this.selectedCategoryId = item.categoryId;
    this.isEditMode = true;
    this.openBudgetModal();
    this.item.id = item.id;
  }

  updateBudgetDetails(){
    this.item.expenseLimit = this.budgetAmount;
    this.item.categoryId = this.selectedCategoryId;
    this._spinnerService.showLoader();
    this._transactionService.updateBudgetDetailsForUser(this.item).subscribe({
      next: (res:any) => {
        if(res != null){
          this._spinnerService.hideLoader();
          this._loggerService.logSuccess("Updated Successfully");
          this.closeBudgetModal();
          this.getAllBudgetListByUserForOneMonth();
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
  onDeleteClicked(item:any){
    const confirmed = confirm("Are you sure you want to delete this item?");
    if(confirmed){
    this._spinnerService.showLoader();
    this._transactionService.deleteBudgetDetailsOfUser(item.id).subscribe({
      next: (res:any) => {
        if(res != null){
          this._spinnerService.hideLoader();
          this._loggerService.logSuccess("Deleted Successfully.");
          this.getAllBudgetListByUserForOneMonth();
        }
      },
      error: (err) => {
        if(err){
          this._spinnerService.hideLoader();
          this._loggerService.logError(err.message);
        }
      },
      complete: () => {
        this._spinnerService.hideLoader();
      }
    })
  }
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
addExpenseDetails(){
  if(this.validateExpenseDetails()){
    this._spinnerService.showLoader();
      this.expenseDetailsObj = new ExpenseDetailsDto();
      this.expenseDetailsObj.categoryId = this.selectExpenseCategoryId;
      this.expenseDetailsObj.expenseAmount = this.expenseAmount;
      this.expenseDetailsObj.emailId = this._currentUserService.getEmailId!;
      this.expenseDetailsObj.month = this.selectedMonth;

      if(this.expenseDetailsObj.emailId == '' || this.expenseDetailsObj.emailId == undefined){
        this._loggerService.logError("An Error Occured...");
        this._spinnerService.hideLoader();
        this._router.navigate(['/auth/login']);
      }
      else{
        this._transactionService.saveExpenseDetailsOfUser(this.expenseDetailsObj).subscribe({
          next: (res:any) =>{
            if(res && res != null){
              this._loggerService.logSuccess("Saved Successfully");
              this._spinnerService.hideLoader();
              this.closeExpenseModal();
              this.expenseAmount = 0;
              this.selectExpenseCategoryId = null;
              this.getAllBudgetListByUserForOneMonth();
              this.getAllExpenseDetailsOfUser();
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
}
validateExpenseDetails(): boolean{
  if(this.expenseAmount == 0 || this.expenseAmount < 0 || this.expenseAmount == undefined){
    this._loggerService.logError("Invalid input for Amount.");
    $('#amount').get(0)?.focus();
    return false;
  }
  if(this.selectExpenseCategoryId == 0 || this.selectExpenseCategoryId == undefined){
    this._loggerService.logError("Please Select a Category.");
    return false;
  }
  return true;
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
          this.totalSpentAmount = this.expenseListOfUser.reduce((total, item) => total + item.expenseAmount, 0)
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
}
