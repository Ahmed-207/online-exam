import { Component, computed, ElementRef, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { LucideAngularModule, EllipsisVertical, UserRound, Bolt, LogOut } from 'lucide-angular';
import { Router, RouterLink } from "@angular/router";
import { UserProfileService } from '../../../../pages/account-page/services/user-profile.service';

@Component({
  selector: 'app-user-card',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  readonly ellipsisVertical = EllipsisVertical;
  dropDownFlag: WritableSignal<boolean> = signal<boolean>(false);
  private readonly eleRef = inject(ElementRef);
  readonly userRound = UserRound;
  readonly bolt = Bolt;
  readonly logOut = LogOut;
  private readonly userProfileService = inject(UserProfileService);
  userFullName = computed<string>(() => { return this.userProfileService.userProfileData().firstName + ' ' + this.userProfileService.userProfileData().lastName });
  userEmail = computed<string>(() => { return this.userProfileService.userProfileData().email });
  private readonly router = inject(Router);



  toggleDropDown(): void {
    this.dropDownFlag.set(!this.dropDownFlag());
  }

  closeDropDown(): void {
    this.dropDownFlag.set(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    if (!this.eleRef.nativeElement.contains(event.target)) {
      this.closeDropDown();
    }
  }
  
  signOut():void{
    this.closeDropDown();
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
