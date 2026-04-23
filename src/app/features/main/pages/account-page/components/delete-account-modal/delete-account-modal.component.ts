import { Router } from '@angular/router';
import { ModalFlagService } from './../../services/modal-flag.service';
import { UserProfileService } from './../../services/user-profile.service';
import { Component, inject } from '@angular/core';
import { LucideAngularModule, TriangleAlert } from 'lucide-angular';
import { MainButtonComponent } from "../../../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-delete-account-modal',
  imports: [LucideAngularModule, MainButtonComponent],
  templateUrl: './delete-account-modal.component.html',
  styleUrl: './delete-account-modal.component.css',
})
export class DeleteAccountModalComponent {

  readonly triangleAlert = TriangleAlert;
  private readonly userProfileService = inject(UserProfileService);
  private readonly modalFlag = inject(ModalFlagService);
  private readonly router = inject(Router);

  deleteAccountForEver(): void {
    this.userProfileService.deleteAccount().subscribe({
      next: (res) => {
        console.log(res.message);
        localStorage.removeItem('token');
        this.modalFlag.deleteAccountFlag.set(false);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  closeModal(): void {
    this.modalFlag.deleteAccountFlag.set(false);
  }

}
