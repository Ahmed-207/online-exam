import { Component } from '@angular/core';
import { LucideAngularModule, UserRound, Bolt, LogOut} from 'lucide-angular';

@Component({
  selector: 'app-dropdown',
  imports: [LucideAngularModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {

  readonly userRound = UserRound;
  readonly bolt = Bolt;
  readonly logOut = LogOut;

}
