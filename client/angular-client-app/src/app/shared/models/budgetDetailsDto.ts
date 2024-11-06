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