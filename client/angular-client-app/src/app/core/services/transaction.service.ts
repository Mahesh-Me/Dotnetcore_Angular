import { Injectable } from "@angular/core";
import { RepositoryAbstractService } from "../http/repository-abstract.service";
import { BudgetDetailsDto } from "../../shared/models/budgetDetailsDto";
import { Observable } from "rxjs";
import { ServerResponse } from "../../shared/models/server-response";
import { CONFIGURATAION } from "../../configs/app-settings.config";

@Injectable({
    providedIn:'root'
})

export class TransactionService{
    constructor(
        private _abstractRepo:RepositoryAbstractService
    ){}

    saveBudgetDetailsOfUser(budgetDetailsObj: BudgetDetailsDto) : Observable<ServerResponse>{
        let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Transaction/SaveBudgetDetailsOfUser';
        return this._abstractRepo.add(actionUrl,budgetDetailsObj);
    }
    getAllBudgetListForUser(emailId:string, selectedMonth:string):Observable<ServerResponse>{
        let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Transaction/GetAllBudgetListByUser/' + emailId + '/' + selectedMonth;
        return this._abstractRepo.getAll(actionUrl);
    }
    updateBudgetDetailsForUser(budgetDetailsObj: any): Observable<ServerResponse>{
        let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Transaction/UpdateBudgetDetails';
        return this._abstractRepo.add(actionUrl,budgetDetailsObj);
    }
    deleteBudgetDetailsOfUser(id:any): Observable<ServerResponse>{
        let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Transaction/DeleteBudgetDetails/' + id;
        return this._abstractRepo.add(actionUrl);
    }
}