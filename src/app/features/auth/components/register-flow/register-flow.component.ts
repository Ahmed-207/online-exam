import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { EmailConfirmComponent } from "./components/email-confirm/email-confirm.component";
import { VerifyOtpComponent } from "./components/verify-otp/verify-otp.component";
import { RegisterComponent } from "./components/register/register.component";
import { CreatePassComponent } from "./components/create-pass/create-pass.component";
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-register-flow',
  imports: [EmailConfirmComponent, VerifyOtpComponent, RegisterComponent, CreatePassComponent],
  templateUrl: './register-flow.component.html',
  styleUrl: './register-flow.component.css',
})
export class RegisterFlowComponent {

  currentState: WritableSignal<string> = signal('email confirm');
  verifiedEmail: WritableSignal<string> = signal('');
  registerData: WritableSignal<{}> = signal<{}>({});

  handleCurrentState(currentStateValue: string): void {
    this.currentState.set(currentStateValue);
  }
  recieveMailValue(emailValue: string): void {
    this.verifiedEmail.set(emailValue);
  }
  recieveRegisterData(registerValue: {}): void {
    this.registerData.set(registerValue);
  }

  readonly steps = [
    { state: 'email confirm', label: 'Email' },
    { state: 'verify otp', label: 'Verify OTP' },
    { state: 'register', label: 'Register' },
    { state: 'create password', label: 'Password' },
  ];

  activeIndex = computed(() => {
    const idx = this.steps.findIndex(s => s.state === this.currentState());
    return idx === -1 ? 0 : idx;
  });

  getStepState(index: number): 'done' | 'active' | 'future' {
    const active = this.activeIndex();
    if (index < active) return 'done';
    if (index === active) return 'active';
    return 'future';
  }

}
