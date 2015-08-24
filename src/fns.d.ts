declare module fns {
  export function noOp(): any;
	export function escapeRegExp(s:string): string;
	export function repl(a:any, r:any, s:any): string; // array or string, array or 0, array or 0
	export function replBase(a:any[], r:any, s:any, baseI:number): string;
	export function normalise(s:string, exclDot:boolean, leaveCase:boolean): string;
	export function addNextLast(o:Object, i:number, a:any[]): Object; // TODO return interface
	export function toTitlecase(str:string): string;
	export function toCamelCase(str:string): string;
	export function toReadable(str:string): string;
	export function toNames(str:string): string;
	export function hash(str:string): string;
	export function r(a:any[], j:number, f:string): any; // returns RegExp
	export function w_options(sOo): Object; // string or object
	export function setPos(token:Object, p:any, pr:string): any;
	export function tokenFn(rules, type, noFallback?, countStart?): () => any; // TODO returned takes interfae
	export function getObjKey(parts:string[], o:Object, create:boolean): any;
	export function getObject(name:string, o:Object, create:boolean): any;
	export function setObjKey(parts:string[], value:any, o:Object): any;
	export function setObject(name:string, value:any, o:Object): any;
	export function mixOptions(options:Object, userDefaultOptions:Object, key:string): Object;
	export function mixin(dest:Object, sources:Object): Object;
	export function mapFn(key:string): () => any; // TODO returned takes interfae
	export function toObj(o:Object, s): Object;
	export function toObjValues(zip, o?:Object): Object;
	export function toObjDeep(arr:any[], keys:string[]): Object;
	export function has(k:any, ao:any): boolean;
	export function hasL(a:any, l:number): number;
	export function first(a:any): any;
	export function last(a:any): any;
	export function str(s:any): boolean;
	export function nr(n:any): boolean;
	export function obj(o:any): boolean;
	export function shallow(o): Object;
	export function values(o): Object;
	export function sugarProto(prefix:string, o:Object, _proto:Object): Object;
}
export = fns;
