const opt = Object.prototype.toString;
export function isString(obj: any): obj is string {
  return opt.call(obj) === "[object String]";
}
export function isNumber(obj: any): obj is number {
  return opt.call(obj) === "[object Number]" && obj === obj; // eslint-disable-line
}
export function isArray(obj: any): obj is any[] {
  return opt.call(obj) === "[object Array]";
}

export function isUndefined(obj: any): obj is undefined {
  return obj === undefined;
}
