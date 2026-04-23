import { Component, effect, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, CircleUserRound, Lock, LogOut, PencilLine } from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MainButtonComponent } from '../../../../shared/components/main-button/main-button.component';
import { UserProfileService } from './services/user-profile.service';
import { EditProfileReq } from './interfaces/edit-profile-req.interface';
import { ChangeEmailFlowComponent } from "./components/change-email-flow/change-email-flow.component";
import { ModalFlagService } from './services/modal-flag.service';

@Component({
  selector: 'app-account-page',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, MainButtonComponent, ReactiveFormsModule, InputTextModule, InputNumberModule, ChangeEmailFlowComponent],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.css',
})
export class AccountPageComponent implements OnInit {

  readonly circleUserRound = CircleUserRound;
  readonly lock = Lock;
  readonly logOut = LogOut;
  readonly pencil = PencilLine;
  private readonly fb = inject(FormBuilder);
  profileForm!: FormGroup;
  private readonly userProfileService = inject(UserProfileService);
  readonly modalFlag = inject(ModalFlagService);
  profileChangeData: WritableSignal<EditProfileReq> = signal({} as EditProfileReq);
  subscriptionRef!: Subscription;
  submitButtonFlag: WritableSignal<boolean> = signal<boolean>(true);

  constructor(){
    effect(()=>{
      if(this.modalFlag.emailModalFlag()){
        console.log('modal opened');
      }else{
        this.profileForm.get('email')?.setValue(this.userProfileService.userProfileData().email);
        console.log('modal closed');
      }
    })
  }

  ngOnInit(): void {
    this.initiateProfileForm();
  }


  initiateProfileForm(): void {
    this.profileForm = this.fb.group({
      firstName: [this.userProfileService.userProfileData().firstName],
      lastName: [this.userProfileService.userProfileData().lastName],
      username: [{ value: this.userProfileService.userProfileData().username, disabled: true }],
      email: [{ value: this.userProfileService.userProfileData().email, disabled: true }],
      phone: [this.userProfileService.userProfileData().phone]
    })
  }

  changeProfileData(): void {
    if (this.profileForm.valid) {
      this.submitButtonFlag.set(false);
      this.profileChangeData.set({ firstName: this.profileForm.get('firstName')?.value, lastName: this.profileForm.get('lastName')?.value, phone: this.profileForm.get('phone')?.value });
      if (this.subscriptionRef) this.subscriptionRef.unsubscribe();
      this.subscriptionRef = this.userProfileService.updateUserProfileData(this.profileChangeData()).subscribe({
        next: (res) => {
          console.log(res);
          this.submitButtonFlag.set(true);
          this.userProfileService.userProfileData.set(res.payload.user);
        },
        error: (err) => {
          console.log(err)
        }
      })

    }
  }

  showModal(): void {
    this.modalFlag.emailModalFlag.set(true)
  }




}
