import { Component } from '@angular/core';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck, RectangleEllipsis } from 'lucide-angular';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-auth-layout',
  imports: [LucideAngularModule, RouterOutlet, CommonModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {

  readonly folderCode = FolderCode;
  readonly brain = Brain;
  readonly bookOpenCheck = BookOpenCheck;
  readonly rectangleEllipsis = RectangleEllipsis;

}