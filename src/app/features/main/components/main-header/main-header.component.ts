import { PageTitleService } from './../../../../core/services/page-title.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LucideAngularModule, ChevronLeft } from 'lucide-angular';
import { filter } from 'rxjs';
@Component({
  selector: 'app-main-header',
  imports: [LucideAngularModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class MainHeaderComponent implements OnInit {

  readonly chevronLeft = ChevronLeft;
  backWardFlag: WritableSignal<boolean> = signal(false);
  private readonly router = inject(Router);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly location = inject(Location);
  previousRoute: WritableSignal<string> = signal<string>('');
  hasHistory: WritableSignal<boolean> = signal<boolean>(false);
  readonly pageTitle = inject(PageTitleService);

  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {
      this.updateBackwardFlag(this.router.url);
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        this.updateBackwardFlag(event.urlAfterRedirects);
        this.hasHistory.set(true);
      });
    }
  }

  updateBackwardFlag(url: string): void {
    const isExactListPath = url === '/home/diplomas';
    this.backWardFlag.set(!isExactListPath);
  }

  goBack(): void {
    if (this.hasHistory()) {

      this.location.back();

    } else {
      this.router.navigate(['/home/diplomas']);
    }
  }



}
