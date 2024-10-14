import { environment } from "../../environments/environment";

export const AppTitle = "Test App";
export let CONFIGURATAION = {
    baseURLs : {
        apiUrl: 'api/',
        serviceUrl: 'services/app/',
    },
    get ServerURL(){
        return environment.server;
    },
    get BaseURLs(){
        return environment.server;
    }
}