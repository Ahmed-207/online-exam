import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-verify-repass',
  imports: [],
  providers: [PrimeIcons],
  templateUrl: './verify-repass.component.html',
  styleUrl: './verify-repass.component.css',
})
export class VerifyRepassComponent {

  private readonly _router = inject(Router);
  storedEmail: WritableSignal<string> = signal<string>('');

  constructor() {
    const nav = this._router.currentNavigation();
    const email = nav?.extras.state?.['email'];
    this.storedEmail.set(email);
  }

  navigateToRegister():void{
    this._router.navigate(['/email-confirm']);
  }


}
