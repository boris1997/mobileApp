export interface IHubProxy {

    on(method: string, behavior: Function): any;

    invoke(method: string, arg1?: any, arg2?: any): any;

};