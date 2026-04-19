import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {

  generalPageTitle:WritableSignal<string> = signal<string>('');
  previousPageTitle:WritableSignal<string> = signal<string>('');


  rollbackTitle():void{
    this.generalPageTitle.set(this.previousPageTitle());
  }
  
}
