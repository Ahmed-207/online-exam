import { Component, inject, input, InputSignal, OnInit } from '@angular/core';
import { Diplomas } from '../../interfaces/diplomas-res.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PageTitleService } from '../../../../../../core/services/page-title.service';

@Component({
  selector: 'app-diploma-card',
  imports: [],
  templateUrl: './diploma-card.component.html',
  styleUrl: './diploma-card.component.css',
})
export class DiplomaCardComponent implements OnInit {

  diplomaCardData: InputSignal<Diplomas> = input.required<Diplomas>();
  diplomaId: InputSignal<string> = input.required<string>();
  private readonly router = inject(Router);
  private readonly activeRoute = inject(ActivatedRoute);
  private readonly pageTitle = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitle.previousPageTitle.set(this.pageTitle.generalPageTitle());
  }

  navigateToDiplomaExams():void{

    this.router.navigate([ this.diplomaId() ], {relativeTo: this.activeRoute});
    this.pageTitle.generalPageTitle.set(this.diplomaCardData().title + ' Exams');

  }



}
