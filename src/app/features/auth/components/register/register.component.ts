import { Component, inject, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  imports: [InputTextModule, InputNumberModule, MainButtonComponent, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly _router = inject(Router);
  private readonly _fb = inject(FormBuilder);
  storedEmail: WritableSignal<string> = signal<string>('');
  registerForm: WritableSignal<FormGroup> = signal<FormGroup>({} as FormGroup);
  buttonFlag: WritableSignal<boolean> = signal(false);
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);
  constructor() {
    const nav = this._router.currentNavigation();
    const email = nav?.extras.state?.['email'];
    this.storedEmail.set(email);
  }
  ngOnInit(): void {
    this.createRegisterForm();
  }
  createRegisterForm(): void {
    this.registerForm.set(this._fb.group({
      username: [null, [Validators.required]],
      email: [this.storedEmail()],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, Validators.required]
    }))
  }

  submitRegisterForm(): void {
    if (this.registerForm().valid) {
      this.buttonFlag.set(true);
      console.log(this.registerForm().value);
      this._router.navigate(['/create-pass'], {
        state: {
          username: this.registerForm().get('username')?.value,
          email: this.registerForm().get('email')?.value,
          firstName: this.registerForm().get('firstName')?.value,
          lastName: this.registerForm().get('lastName')?.value,
          phone: this.registerForm().get('phone')?.value
        }
      })
    }
  }

}
