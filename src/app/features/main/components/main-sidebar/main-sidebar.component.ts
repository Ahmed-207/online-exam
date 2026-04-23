import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { LucideAngularModule, FolderCode, GraduationCap, UserRound } from 'lucide-angular';
import { UserCardComponent } from "./components/user-card/user-card.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MenuItem } from 'primeng/api';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { DockModule } from 'primeng/dock';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-main-sidebar',
  imports: [LucideAngularModule, UserCardComponent, RouterLink, RouterLinkActive, DockModule, TooltipModule],
  templateUrl: './main-sidebar.component.html',
  styleUrl: './main-sidebar.component.css',
})
export class MainSidebarComponent implements OnInit {

  readonly folderCode = FolderCode;
  readonly graduationCap = GraduationCap;
  readonly userRound = UserRound;
  items: MenuItem[] | undefined;
  private readonly plat_id = inject(PLATFORM_ID);
  private readonly breakpointObserver = inject(BreakpointObserver);


  ngOnInit(): void {

    if (isPlatformBrowser(this.plat_id)) {

      this.initiateMenuBar();

    }
  }

  initiateMenuBar(): void {
    this.items = [
      {
        label: 'Diplomas',
        iconClass: 'pi pi-graduation-cap',
        routerLink: 'diplomas'
      },
      {
        label: 'Account setting',
        iconClass: 'pi pi-cog',
        routerLink: 'account',
      }
    ];
  }


  isSmallScreen = toSignal(
    this.breakpointObserver.observe('(max-width: 800px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

}

