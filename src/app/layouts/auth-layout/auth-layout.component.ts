import { Component } from '@angular/core';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck , RectangleEllipsis} from 'lucide-angular';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-auth-layout',
  imports: [LucideAngularModule, RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

  readonly folderCode = FolderCode
  readonly brain = Brain
  readonly bookOpenCheck = BookOpenCheck
  readonly rectangleEllipsis = RectangleEllipsis

}
