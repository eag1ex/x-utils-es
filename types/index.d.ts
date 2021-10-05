
declare namespace xutils {

    export type TlogTypes = "log" | "warn" | "error" | "onerror" | "attention" | "debug" | "alert" | "stack" | "errorTrace"
    export type TlogMode = "on" | "off"
    export type TloopCallback = (index: number) => any 
    export type CB = () => any 
    
    export interface WithHoc extends FunctionConstructor{
        (...args:any):any
    }

    export type CallbackEval = () => boolean 
    export interface TypeCheck {
        type: string
        value: number
        primitiveValue: any
    }

    export interface SimpleQ extends Promise<any> {
      //  [name?:string]: Promise<any>
        entity?: string
        progress(cb: (value: "resolved" | "rejected" | "in_progress" | "timeout", time?:number) => void, every?: number, timeout?: number): SimpleQ
        resolve(arg: any): SimpleQ
        reject(arg: any): SimpleQ
        promise: Promise<any>
    }

    export interface CancelPromiseProps {
        //{ error, defer, id }
        defer: Promise<any>
        checkEvery: number
        maxWait: number
        id: string | number
        message?: string
        logging?: boolean
        cbErr(arg: { error: string, defer: { resolve: ()=>any, reject: ()=>any }, id: string | number }): void 
    }

    export interface Dispatcher {
        subscribe(cb: (data: any, uid: string, index: number) => void): Dispatcher
        onComplete(cb: (uid: string) => void): Dispatcher
        next(data: any): Dispatcher
        delete(): Dispatcher
        isActive(): boolean
    }


    export interface Xrequire{
        (id:string | URL, dir?:string, ref?: 'ERR_NO_THROW' | undefined): any
    }

     

    export interface XReferenceOpts{
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
        columnNumber?:number
    }
    export interface TXReferenceError extends ReferenceErrorConstructor{
        lineNumber?:number
        fileName?:string
        columnNumber?:number
    }

    export interface IXErrorOpts{
        id?:string|number
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
    }

    export interface TXError extends ErrorConstructor{
        id?:string|number
        name?:string
        message?:string
        fileName?:string
        lineNumber?:number
    }



    // logging types
    export function disableLogging(): boolean 
    export function resetLogging(): boolean 
    export function loggerSetting(logType: TlogTypes, logMode?: TlogMode): boolean 
    export function checkLoggerSetting(logType: TlogTypes): TlogMode 
    export function loggingON(): boolean 
    export function log(...any:any): any 
    export function attention(...any:any): any 
    export function debug(...any:any): any
    export function alert(...any:any): any
    export function stack(data: any, asArray: boolean): any 
    export function errorTrace(data: any, asArray: boolean): any 
    export function warn(...any:any): any 
    export function error(...any:any): any 
    export function onerror(...any:any): any 


    export function isFunction(el: any): boolean 
    export function isArray(arr: any, cbEval?: CallbackEval): boolean 
    export function isBigInt(n: any): boolean 
    export function loop(size: number, cb: TloopCallback): Array<any> 
    export function validDate(dt: any, cbEval?: CallbackEval): boolean 
    export function arraySize(arr: any): number 
    export function typeCheck(el: any, standard?: boolean): TypeCheck 
    export function isError(el: any): boolean 
    export function isFalse(el: any): boolean 
    export function isTrue(el: any): boolean 
    export function isBoolean(el: any): boolean 
    export function isNull(el: any): boolean 
    export function isUndefined(el): boolean 
    export function isEmpty(value: any): boolean 
    export function head(arr: Array<any>): any 
    export function last(arr: Array<any>): any 
    export function timer(cb: CB, time?: number): void 
    export function interval(cb: CB, every?: number, endTime?: number): void 
    export function sq(): SimpleQ 
    export function cancelPromise(options: CancelPromiseProps): Promise<any> 
    export function validID(id: string): string 
    export function isNumber(n: any): boolean 
    export function isDate(d: any): boolean 
    export function stringSize(str: string): number 
    export function isQPromise(defer: any): boolean 
    export function isSQ(defer: any): boolean 
    export function isPromise(defer: any): boolean 
    export function isObject(obj: any, cbEval?: CallbackEval): boolean 
    export function uniq(arr: Array<any>): Array<any> 
    export function shuffle(arr:  Array<any>): Array<any> 
    export function selectiveArray(selectBy: Array<string>, data: Array<any>): Array<[]> 
    export function isClass(obj: object, cbEval?: CallbackEval): boolean 
    export function hasPrototype(obj: object, cbEval?: CallbackEval): boolean 
    export function hasProto(el: object, cbEval?: CallbackEval): boolean 
    export function isRegExp(expression: RegExp): boolean 
    export function isInstance(obj: any, cbEval?: CallbackEval): boolean 
    export function objectSize(obj: any): number 
    export function isFalsy(el: any): boolean 
    export function isString(str: any, cbEval?: CallbackEval): boolean 
    export function copyBy(obj: object, refs: Array<string>): object 
    export function copy(data: any): any 
    export function asJson(data: any): string 
    export function copyDeep(data: any): any 
    export function delay(time?: number): Promise<any> 
    export function someKeyMatch(object: object, source: object, cbEval?: CallbackEval): boolean 
    export function exactKeyMatch(object: object, source: object, cbEval?: CallbackEval): boolean 
    export function trueVal(arr: Array<any>): Array<any> 
    export function trueValDeep(arr: Array<any>): Array<any> 
    export function trueProp(obj: object): object 
    export function resolver(fn: CB, timeout?: number, testEvery?: number): Promise<any> 
    export function flatten(arr: Array<any>): Array<any> 
    export function flattenDeep(arr: Array<any>): Array<any> 
    export function chunks(arr: Array<any>, size: number): Array<[]> 
    export function dupes(item: any, index: number): Array<any> 
    export function uniqBy(arr:  Array<any>, propName: string): Array<any> 
    export function arrayWith(arr: Array<any>, prop: string): Array<any> 
    export function exFromArray(arr: Array<any>, excludes: Array<string>): Array<any> 
    export function pickFromArray(arr:  Array<any>, picks: Array<any>): Array<any> 
    export function dispatcher(uid?: string | number, debug?: boolean): Dispatcher
    export function withHoc(item: WithHoc, ...args: any): WithHoc 
    export function truthFul(obj: object): object 
    
    export const xrequire:Xrequire 

    export function inIndex(str: string, patterns: Array<RegExp>): number 
    export function matched(str: string, expression: RegExp): boolean 
    export function referenceError(opts?:XReferenceOpts):TXReferenceError 
    export function xError(opts?:IXErrorOpts):TXError 
    export function noop():void 
    export function trim(str:string):string
    export function includes(id:any, arr:Array<any>):boolean
    export function unsubscribe(subscriptions:Array<any>, message?:string):boolean
    export function objectIterateWith(obj:object,props:Array<any>):object
    
}

export as namespace xutils

export {xutils} 