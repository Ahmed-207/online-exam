import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
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
export class DiplomasPageComponent implements OnInit {

  private readonly diplomasService = inject(DiplomasService);
  diplomasForPage: WritableSignal<Diplomas[]> = signal<Diplomas[]>([]);
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly pageTitle = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitle.updateTitle('Diplomas');
    if(isPlatformBrowser(this.plat_id)){
       this.getDiplomas();
    }
  }

  getDiplomas(): void {
    if (localStorage.getItem('token')) {
      this.diplomasService.getAllDiplomas().subscribe({
        next: (res) => {
          this.diplomasForPage.set(res.payload.data);
          console.log(this.diplomasForPage());
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

}
