import { Injectable } from "@angular/core";
import { RepositoryAbstractService } from "../http/repository-abstract.service";
import { Observable } from "rxjs";
import { ServerResponse } from "../../shared/models/server-response";
import { CONFIGURATAION } from "../../configs/app-settings.config";

@Injectable({
    providedIn: 'root'
})
export class CommonService{
    constructor(
        private abstractRepository: RepositoryAbstractService,
    )
    {}

    getAllCategoryList():Observable<ServerResponse>{
        let actionUrl = CONFIGURATAION.ServerURL + CONFIGURATAION.baseURLs.apiUrl + 'Common/GetAllCategoryMaster';
        return this.abstractRepository.getAll(actionUrl);
    }
}