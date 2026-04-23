import { Component, inject, OnInit, output, signal, WritableSignal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MainButtonComponent } from '../../../../../../../../shared/components/main-button/main-button.component';
import { AlertMessageComponent } from '../../../../../../../../shared/components/alert-message/alert-message.component';
import { UserProfileService } from '../../../../services/user-profile.service';

@Component({
  selector: 'app-change-email',
  imports: [MainButtonComponent, InputTextModule, ReactiveFormsModule, AlertMessageComponent],
  templateUrl: './change-email.component.html',
  styleUrl: './change-email.component.css',
})
export class ChangeEmailComponent implements OnInit{


  errorMsg: WritableSignal<string> = signal<string>('');
  errorFlag: WritableSignal<boolean> = signal<boolean>(false);
  buttonFlag: WritableSignal<boolean> = signal<boolean>(false);
  emailChangeForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  private readonly userProfileService = inject(UserProfileService);
  emailValue = output<string>();
  nextState = output<string>();

  ngOnInit(): void {

    this.initiateEmailChangeForm();
    
  }

  initiateEmailChangeForm():void{
    this.emailChangeForm = this.fb.group({
      newEmail: [null, [Validators.required, Validators.email]]
    })
  }

  submitEmailChange():void{

    this.buttonFlag.set(true);
    if(this.emailChangeForm.valid){
      this.userProfileService.updateUserEmail(this.emailChangeForm.value).subscribe({
        next: (res)=>{
          this.buttonFlag.set(false);
          this.errorFlag.set(false);
          this.emailValue.emit(this.emailChangeForm.get('newEmail')?.value);
          console.log(res);
          this.nextState.emit('verify change');
        },
        error: (err: HttpErrorResponse)=>{
          this.errorFlag.set(true);
          this.buttonFlag.set(false);
          this.errorMsg.set(err.message);
        }
      })
    }

  }

}
