import { Component, inject } from '@angular/core';
import { MainButtonComponent } from "../../shared/components/main-button/main-button.component";
import { Router } from '@angular/router';
import { LucideAngularModule, CircleX } from 'lucide-angular';

@Component({
  selector: 'app-error-page',
  imports: [MainButtonComponent, LucideAngularModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css',
})
export class ErrorPageComponent {

  private readonly router = inject(Router);
  readonly circleX = CircleX

  exploreDiplomas(): void {
    this.router.navigate(['home/diplomas']);
  }

}
