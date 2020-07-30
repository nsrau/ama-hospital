export class LocalstorageService {

  private _localstorage: Storage = window.localStorage;
  private _cache_duration = 15;

  constructor() {
    if (!this.supportsLocalStorage()) {
      console.error('LocalstorageService: No HTML5 localStorage Support');
    } else {
      this.AutoClear();
    }
  }

  supportsLocalStorage(): boolean {
    return typeof(this._localstorage) !== 'undefined';
  }

  Set(key: string, val: string): void {
    this._localstorage.setItem(key, val);
  }

  Get(key: string): any {
    return this._localstorage.getItem(key);
  }

  Remove(key: string): void {
    this._localstorage.removeItem(key);
  }

  SetJSON(key: string, val: Object): void {
    try {
      this.Set(key, JSON.stringify(val));
    } catch (e) {
      console.error(e);
    }
  }

  GetJSON(key: string): any {
    try {
      return JSON.parse(this.Get(key));
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  ClearAll(): void {
    this._localstorage.clear();
  }

  private AutoClear(): void {
    // When was it last updated?
    const m = 60000;
    const t = this._cache_duration * m;
    const timestamp = this.Get('check_duration');
    const now = new Date().getTime();
    // Is the timestamp valid?
    const invalid = !timestamp || now - timestamp > t;

    if (invalid) {
      // Flush the cache.
      this.ClearAll();

      // New timestamp.
      this.Set('check_duration', now.toString());
    }
  }

}
