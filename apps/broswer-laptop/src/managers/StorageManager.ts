import store from "storejs";
export class StorageManager {
  private constructor() {}
  public static shared = new StorageManager();

  set(key: string, data: unknown) {
    this._set_single(key, data);
  }
  get<T>(key: string): T | null {
    return this._get(key);
  }
  gets(...args: string[]) {
    return this._gets(...args);
  }
  remove(key: string) {
    return this._remove_single(key);
  }
  clear() {
    return this._clear();
  }
  has(key: string) {
    return this._has(key);
  }
  keys() {
    return this._keys();
  }
  all() {
    return this._all();
  }
  _set_single(key: string, data: unknown) {
    return store.set(key, data);
  }
  _remove_single(key: string) {
    return store.remove(key);
  }
  _clear() {
    return store.clear();
  }
  _has(key: string) {
    return store.get(`?${key}`);
  }
  _keys() {
    return store.keys();
  }
  _all() {
    return store();
  }
  _get(key: string) {
    return store.get(key);
  }
  _gets(...args: string[]) {
    return store.get(...args);
  }
}
