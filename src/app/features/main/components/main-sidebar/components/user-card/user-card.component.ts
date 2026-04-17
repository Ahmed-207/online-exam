import { Component, signal, WritableSignal } from '@angular/core';
import { LucideAngularModule, EllipsisVertical} from 'lucide-angular';
import { DropdownComponent } from "./components/dropdown/dropdown.component";

@Component({
  selector: 'app-user-card',
  imports: [LucideAngularModule, DropdownComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css',
})
export class UserCardComponent {

  readonly ellipsisVertical = EllipsisVertical;
  dropDownFlag:WritableSignal<boolean> = signal<boolean>(false);



  toggleDropDown():void{
    this.dropDownFlag.set(!this.dropDownFlag());
  }

}
