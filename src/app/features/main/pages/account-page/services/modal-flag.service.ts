import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalFlagService {

  emailModalFlag: WritableSignal<boolean> = signal<boolean>(false);
  deleteAccountFlag: WritableSignal<boolean> = signal<boolean>(false);
  
}
