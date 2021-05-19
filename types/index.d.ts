
declare namespace xutils {

    declare type TlogTypes = "log" | "warn" | "error" | "onerror" | "attention" | "debug" | "alert" | "stack" | "errorTrace"
    declare type TlogMode = "on" | "off"
    declare type TloopCallback = (index: number) => any;
    declare type CB = () => any;
    
    declare interface TwithHoc extends Fuction{
        (...args:any):any
    }
    declare type TcbEval = () => boolean;
    declare interface ItypeCheck {
        type: string
        value: number
        primitiveValue: any
    }

    /*
         * @memberof SimpleQ
         * @param {callback} cb 
         * @param {number} every 
         * @param {number} timeout when to stop checking progress (will exit setInterval)
         
         progress(cb, every = 100, timeout = 1000) {
    **/

    declare interface ISimpleQ extends Promise<T> {
        [Promise]: Promise<T>
        entity?: string;
        progress(cb: (value: "resolved" | "rejected" | "in_progress" | "timeout", time?:number) => void, every?: number, timeout?: number): ISimpleQ;
        resolve(arg: any): ISimpleQ;
        reject(arg: any): ISimpleQ;
        promise: Promise<T>
    }

    declare interface IcancelPromiseProps {
        //{ error, defer, id }
        defer: Promise<any>
        checkEvery: number
        maxWait: number
        id: string | number
        message?: string
        logging?: boolean
        cbErr(arg: { error: string, defer: { resolve: Function<any>, reject: Function<any> }, id: string | number }): void;
    }

    declare interface Idispatcher {
        subscribe(cb: (data: any, uid: string, index: number) => void): Idispatcher
        onComplete(cb: (uid: string) => void): Idispatcher
        next(data: any): Idispatcher
        delete(): Idispatcher
        isActive(): boolean
    }

    declare type xrequireRef = 'ERR_NO_THROW' | undefined
    declare type Tselection  = Selection | string
    declare interface Ixrequire extends NodeRequire {
        (id:Tselection, ref?: xrequireRef): any
    }
    declare interface IXReferenceOpts{
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
        columnNumber?:number
    }
    declare interface TXReferenceError extends ReferenceErrorConstructor{
        lineNumber?:number
        fileName?:string
        columnNumber?:number
    }

    declare interface IXErrorOpts{
        id?:string|number
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
    }

    declare interface TXError extends Error{
        id?:string|number
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
    }


    // logging types
    declare function disableLogging(): boolean;
    declare function resetLogging(): boolean;
    declare function loggerSetting(logType: TlogTypes, logMode?: TlogMode): boolean;
    declare function checkLoggerSetting(logType: TlogTypes): TlogMode;
    declare function loggingON(): boolean;
    declare function log(...any:any): any;
    declare function attention(...any:any): any;
    declare function debug(...any:any): any;
    declare function alert(...any:any): any;
    declare function stack(data: any, asArray: boolean): any;
    declare function errorTrace(data: any, asArray: boolean): any;
    declare function warn(...any:any): any;
    declare function error(...any:any): any;
    declare function onerror(...any:any): any;


    declare function isFunction(el: any): boolean;
    declare function isArray(arr: any, cbEval?: TcbEval): boolean;
    declare function isBigInt(n: any): boolean;
    declare function loop(size: number, cb: TloopCallback): Array<any>;
    declare function validDate(dt: any, cbEval?: TcbEval): boolean;
    declare function arraySize(arr: any): number;
    declare function typeCheck(el: any, standard?: boolean): ItypeCheck;
    declare function isError(el: any): boolean;
    declare function isFalse(el: any): boolean;
    declare function isTrue(el: any): boolean;
    declare function isBoolean(el: any): boolean;
    declare function isNull(el: any): boolean;
    declare function isUndefined(el): boolean;
    declare function isEmpty(value: any): boolean;
    declare function head(arr: Array<any>): any;
    declare function last(arr: Array<any>): any;
    declare function timer(cb: CB, time?: number): void;
    declare function interval(cb: CB, every?: number, endTime?: number): void;
    declare function sq(): ISimpleQ;
    declare function cancelPromise(options: IcancelPromiseProps): Promise<T>;
    declare function validID(id: string): string;
    declare function isNumber(n: any): boolean;
    declare function isDate(d: any): boolean;
    declare function stringSize(str: string): number;
    declare function isQPromise(defer: any): boolean;
    declare function isSQ(defer: any): boolean;
    declare function isPromise(defer: any): boolean;
    declare function isObject(obj: any, cbEval?: TcbEval): boolean;
    declare function uniq(arr: Array<any>): Array<any>;
    declare function shuffle(arr:  Array<any>): Array<any>;
    declare function selectiveArray(selectBy: Array<string>, data: Array<any>): Array<[]>;
    declare function isClass(obj: object, cbEval?: TcbEval): boolean;
    declare function hasPrototype(obj: object, cbEval?: TcbEval): boolean;
    declare function hasProto(el: object, cbEval?: TcbEval): boolean;
    declare function isRegExp(expression: RegExp): boolean;
    declare function isInstance(obj: any, cbEval?: TcbEval): boolean;
    declare function objectSize(obj: any): number;
    declare function isFalsy(el: any): boolean;
    declare function isString(str: any, cbEval?: TcbEval): boolean;
    declare function copyBy(obj: object, refs: Array<string>): Object;
    declare function copy(data: any): any;
    declare function asJson(data: any): string;
    declare function copyDeep(data: any): any;
    declare function delay(time?: number): Promise<T>;
    declare function someKeyMatch(object: object, source: object, cbEval?: TcbEval): boolean;
    declare function exactKeyMatch(object: object, source: object, cbEval?: TcbEval): boolean;
    declare function trueVal(arr: Array<any>): Array<any>;
    declare function trueValDeep(arr: Array<any>): Array<any>;
    declare function trueProp(obj: object): object;
    declare function resolver(fn: CB, timeout?: number, testEvery?: number): Promise<T>;
    declare function flatten(arr: Array<any>): Array<any>;
    declare function flattenDeep(arr: Array<any>): Array<any>;
    declare function chunks(arr: Array<any>, size: number): Array<[]>;
    declare function dupes(item: any, index: number): Array<any>;
    declare function uniqBy(arr:  Array<any>, propName: string): Array<any>;
    declare function arrayWith(arr: Array<any>, prop: string): Array<any>;
    declare function exFromArray(arr: Array<any>, excludes: Array<string>): Array<any>;
    declare function pickFromArray(arr:  Array<any>, picks: Array<any>): Array<any>;
    declare function dispatcher(uid?: string | number, debug?: boolean): Idispatcher
    declare function withHoc(item: TwithHoc, ...args: any): TwithHoc;
    declare function truthFul(obj: object): object;
    declare const xrequire: Ixrequire;
    declare function inIndex(str: string, patterns: Array<string>): number;
    declare function matched(str: string, expression: RegExp): boolean;
    declare function referenceError(opts?:IXReferenceOpts):TXReferenceError;
    declare function xError(opts?:IXErrorOpts):TXError;
    declare function noop():void
}

export as namespace xutils

export {xutils}