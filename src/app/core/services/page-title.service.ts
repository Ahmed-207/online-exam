import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {

  generalPageTitle:WritableSignal<string> = signal<string>('');
  
}
