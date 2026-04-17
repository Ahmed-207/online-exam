import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, ChevronLeft} from 'lucide-angular';
@Component({
  selector: 'app-main-header',
  imports: [LucideAngularModule],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.css',
})
export class MainHeaderComponent implements OnInit{

  readonly chevronLeft = ChevronLeft;
  backWardFlag: WritableSignal<boolean> = signal(true);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly plat_id = PLATFORM_ID;
  previousRoute: WritableSignal<string> = signal<string>('');

  ngOnInit(): void {

    if(isPlatformBrowser(this.plat_id)){
      this.activatedRoute.paramMap.subscribe({
        next: ()=>{

          // to check if there is a previous route 
          // if yes ,, change the backward flag to true and give a value to previousRoute 

        }
      })
    }
    
  }


  goBack():void{
    // to navigate to previousRoute
  }

}
