import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal, viewChild, ElementRef, effect, OnDestroy } from '@angular/core';
import { DiplomaCardComponent } from "./components/diploma-card/diploma-card.component";
import { DiplomasService } from './services/diplomas.service';
import { Diplomas } from './interfaces/diplomas-res.interface';
import { isPlatformBrowser } from '@angular/common';
import { PageTitleService } from '../../../../core/services/page-title.service';

@Component({
  selector: 'app-diplomas-page',
  imports: [DiplomaCardComponent],
  templateUrl: './diplomas-page.component.html',
  styleUrl: './diplomas-page.component.css',
})
export class DiplomasPageComponent implements OnInit, OnDestroy {

  private readonly diplomasService = inject(DiplomasService);
  diplomasForPage: WritableSignal<Diplomas[]> = signal<Diplomas[]>([]);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly pageTitle = inject(PageTitleService);
  sentinel = viewChild<ElementRef>('nextPageSentinel');
  hasMoreData = signal(true);
  isLoading: WritableSignal<boolean> = signal<boolean>(false);
  currentPage: number = 1;
  timeOutRef: any;

  constructor() {
    effect(() => {
      const element = this.sentinel()?.nativeElement;
      if (element && isPlatformBrowser(this.plat_id)) {
        this.timeOutRef = setTimeout(() => {
          this.setupIntersectionObserver(element);
        }, 1000);
      }
    });
  }

  ngOnInit(): void {
    this.pageTitle.updateTitle('Diplomas');
    if (isPlatformBrowser(this.plat_id)) {
      this.getDiplomas();
    }
  }


  setupIntersectionObserver(element: HTMLElement) {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.isLoading() && this.hasMoreData()) {
          this.getDiplomas();
        }
      });
    });

    observer.observe(element);
  }

  getDiplomas(): void {
    this.isLoading.set(true);
    this.diplomasService.getAllDiplomas(this.currentPage).subscribe({
      next: (res) => {
        const newData = res.payload.data;

        if (newData.length === 0) {
          this.hasMoreData.set(false);
        } else {
          this.diplomasForPage.update(prev => [...prev, ...newData]);
          this.currentPage++;
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {

    clearTimeout(this.timeOutRef);

  }

}
