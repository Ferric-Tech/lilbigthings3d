import { Injectable } from '@angular/core';
import { LocalStorageItem } from './local-storage.enum';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  get(item: LocalStorageItem) {
    let content = window.localStorage.getItem(item);

    if (!content) return;
    return JSON.parse(content);
  }

  set(item: LocalStorageItem, content: any) {
    if (!item || !content) return;

    window.localStorage.setItem(item, JSON.stringify(content));
  }
}
