import { eventNames } from 'process'

declare namespace exutils {
    // log/warn/error/onerror/attention/debug/alert
    declare type TlogTypes = "log" | "warn" | "error" | "onerror" | "attention" | "debug" | "alert" | "stack" | "errorTrace"
    declare type TlogMode = "on" | "off"
    declare type TloopCallback = (index: number) => any;
    declare type CB = () => any;

    declare type TcbEval = ()=>boolean;
    declare interface ItypeCheck{
        type:string
        value:number
        primitiveValue:any
    }

    declare interface Isq extends Promise<T>{    
        resolve(arg: any):Isq;
        reject(arg: any):Isq;  
        promise:Promise<T>
    }

    // logging types
    declare function disableLogging(): boolean;
    declare function resetLogging(): boolean;
    declare function loggerSetting (logType:TlogTypes, logMode?:TlogMode): boolean;
    declare function checkLoggerSetting(logType:TlogTypes) : TlogMode;
    declare function loggingON():boolean;
    declare function log(...:any):any;
    declare function attention(...:any):any;
    declare function debug(...:any):any;
    declare function alert(...:any):any;
    declare function stack(data:any, asArray:boolean ):any;
    declare function errorTrace(data:any, asArray:boolean ):any;
    declare function warn(...:any):any;
    declare function error(...:any):any;
    declare function onerror(...:any):any;

    declare function isFunction(el: any): boolean;
    declare function isArray(arr: any, cbEval?:TcbEval): boolean;
    declare function isBigInt(n:any):boolean;
    declare function loop(size:numner, cb:TloopCallback):[];
    declare function validDate(dt:any, cbEval?:TcbEval):boolean;
    declare function arraySize(arr:any):number;
    declare function typeCheck(el:any, standard?:boolean):ItypeCheck;
    declare function isError(el:any):boolean;
    declare function isFalse(el:any):boolean;
    declare function isTrue(el:any):boolean;
    declare function isBoolean(el:any):boolean;
    declare function isNull(el:any):boolean;
    declare function isUndefined(el):boolean;
    declare function isEmpty(value:any):boolean;
    declare function head(arr:Array<any>):any;
    declare function last(arr:Array<any>):any;
    declare function timer(cb:CB, time?:number):void;
    declare function interval(cb:CB, every?:number, endTime?:number):void;
    declare function sq():Isq | Promise<T>

}
export = exutils
export as namespace exutils