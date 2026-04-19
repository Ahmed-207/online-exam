import { Component, inject } from '@angular/core';
import { MainSidebarComponent } from "../../../features/main/components/main-sidebar/main-sidebar.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { MainHeaderComponent } from "../../../features/main/components/main-header/main-header.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from "@angular/router";
import { PageTitleService } from '../../services/page-title.service';
import { filter } from 'rxjs';

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

  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const label = this.getRouteBreadcrumb(this.activatedRoute.root);
      if (label && label !== this.pageTitleService.generalPageTitle()) {
        this.pageTitleService.updateTitle(label);
      }
    });
  }

  private getRouteBreadcrumb(route: ActivatedRoute): string | null {
    let child = route.firstChild;
    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot.data['breadcrumb'] || null;
  }
}
