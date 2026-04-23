import { Component, computed, inject, output, signal, WritableSignal } from '@angular/core';
import { ChangeEmailComponent } from './components/change-email/change-email.component';
import { VerifyChangeEmailComponent } from './components/verify-change-email/verify-change-email.component';
import { ModalFlagService } from '../../services/modal-flag.service';


@Component({
  selector: 'app-change-email-flow',
  imports: [ChangeEmailComponent, VerifyChangeEmailComponent],
  templateUrl: './change-email-flow.component.html',
  styleUrl: './change-email-flow.component.css',
})
export class ChangeEmailFlowComponent {


  currentState: WritableSignal<string> = signal('change email');
  verifiedEmail: WritableSignal<string> = signal('');
  finalEmail = output<string>();
  readonly modalFlag = inject(ModalFlagService);
  

  handleCurrentState(currentStateValue: string): void {
    this.currentState.set(currentStateValue);
  }
  recieveMailValue(emailValue: string): void {
    this.verifiedEmail.set(emailValue);
  }

  readonly steps = [
    { state: 'change email', label: 'Change Email' },
    { state: 'verify change', label: 'Verify Change' },
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

  closeModal():void{
    this.modalFlag.emailModalFlag.set(false);
  }

}
