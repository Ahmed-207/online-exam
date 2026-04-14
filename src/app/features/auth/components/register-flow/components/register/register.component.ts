import { Component, inject, input, InputSignal, output, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";
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
  storedEmail: InputSignal<string> = input<string>(''); 
  registerForm!: FormGroup;
  buttonFlag: WritableSignal<boolean> = signal(false);
  currentStateFlag = output<string>();
  registerData = output<{}>();
  subscriptionRef: WritableSignal<Subscription> = signal(new Subscription);




  ngOnInit(): void {
    this.createRegisterForm();
  }
  registerEmit():void{
    this.currentStateFlag.emit('create password')
  }
  registerDataEmit():void{
    this.registerData.emit(this.registerForm.value);
  }
  createRegisterForm(): void {
    this.registerForm =this._fb.group({
      username: [null, [Validators.required]],
      email: [this.storedEmail()],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phone: [null, Validators.required]
    })
  }

  submitRegisterForm(): void {
    if (this.registerForm.valid) {
      this.buttonFlag.set(true);
      console.log(this.registerForm.value);
      this.registerEmit();
      this.registerDataEmit();
    }
  }

}
