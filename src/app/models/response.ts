export interface Response<T> {
    result:boolean;
    errorCode:string;
    message:string;
    data:T;
}
