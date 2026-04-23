import { Component, inject } from '@angular/core';
import { MainSidebarComponent } from "../../../features/main/components/main-sidebar/main-sidebar.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { MainHeaderComponent } from "../../../features/main/components/main-header/main-header.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { PageTitleService } from '../../services/page-title.service';
import { filter } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { UserProfileService } from '../../../features/main/pages/account-page/services/user-profile.service';

@Component({
  selector: 'app-main-layout',
  imports: [MainSidebarComponent, BreadcrumbModule, MainHeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  public pageTitleService = inject(PageTitleService);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly userProfileService = inject(UserProfileService);


  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  ngOnInit() {


    this.getProfileData();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const label = this.getRouteBreadcrumb(this.activatedRoute.root);
      if (label && label !== this.pageTitleService.generalPageTitle()) {
        this.pageTitleService.updateTitle(label);
      }
    });
  }

  isSmallScreen = toSignal(
    this.breakpointObserver.observe('(max-width: 800px)').pipe(
      map(result => result.matches)
    ),
    { initialValue: false }
  );

  private getRouteBreadcrumb(route: ActivatedRoute): string | null {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data['breadcrumb'] || null;
  }


  getProfileData(): void {
    this.userProfileService.getUserProfileData().subscribe({
      next: (res) => {
        this.userProfileService.userProfileData.set(res.payload.user);
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }


}
