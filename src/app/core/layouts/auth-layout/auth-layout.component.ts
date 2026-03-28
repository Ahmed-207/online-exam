import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule, FolderCode, Brain, BookOpenCheck, RectangleEllipsis } from 'lucide-angular';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';

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

  private readonly _router = inject(Router);

  private currentUrl = toSignal(
    this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this._router.url }
  );

  readonly steps = [
    { path: '/email-confirm', label: 'Email' },
    { path: '/verify-otp', label: 'Verify OTP' },
    { path: '/register', label: 'Register' },
    { path: '/create-pass', label: 'Password' },
  ];

  stepperFlag = computed(() =>
    this.steps.some(s => this.currentUrl().includes(s.path))
  );

  activeIndex = computed(() => {
    const url = this.currentUrl();
    const idx = this.steps.findIndex(s => url.includes(s.path));
    return idx === -1 ? 0 : idx;
  });

  getStepState(index: number): 'done' | 'active' | 'future' {
    const active = this.activeIndex();
    if (index < active) return 'done';
    if (index === active) return 'active';
    return 'future';
  }
}