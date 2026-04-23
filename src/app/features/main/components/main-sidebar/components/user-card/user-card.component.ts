import { Component, ElementRef, HostListener, inject, signal, WritableSignal } from '@angular/core';
import { LucideAngularModule, EllipsisVertical, UserRound, Bolt, LogOut } from 'lucide-angular';
import { RouterLink } from "@angular/router";

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
}
