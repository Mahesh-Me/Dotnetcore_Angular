export class BudgetDetailsDto{
    id:number = 0;
    categoryId:number| null = null;
    expenseLimit:number = 0;
    emailId !:string;
    month: string = '';
}

export class updateBudgetDetailsDto{
    id:number = 0;
    categoryId:number| null = null;
    expenseLimit:number = 0;
    userId !:number;
    month: string = '';
}

export class ExpenseDetailsDto{
    id:number = 0;
    categoryId:number| null = null;
    expenseAmount:number = 0;
    emailId !:string;
    month: string = '';
}
export class UpdateExpenseDetailsDto{
    id:number = 0;
    categoryId:number| null = null;
    expenseAmount:number = 0;
    userId !:number;
    month: string = '';
}