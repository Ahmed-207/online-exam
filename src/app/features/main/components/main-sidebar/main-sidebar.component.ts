import { Component } from '@angular/core';
import { LucideAngularModule, FolderCode, GraduationCap, UserRound} from 'lucide-angular';
import { UserCardComponent } from "./components/user-card/user-card.component";
@Component({
  selector: 'app-main-sidebar',
  imports: [LucideAngularModule, UserCardComponent],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css',
})
export class MainSidebarComponent {

  readonly folderCode = FolderCode;
  readonly graduationCap = GraduationCap;
  readonly userRound = UserRound;

}
