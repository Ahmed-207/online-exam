import { Component, output, signal, WritableSignal } from '@angular/core';
import { MainSidebarComponent } from "../../../features/main/components/main-sidebar/main-sidebar.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { MainHeaderComponent } from "../../../features/main/components/main-header/main-header.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-layout',
  imports: [MainSidebarComponent, BreadcrumbModule, MainHeaderComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  items: MenuItem[] = [{ label: 'Components' }, { label: 'Form' }, { label: 'InputText', routerLink: '/inputtext' }];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };



  // integrate the routing with breadcrumb ( pdf in the searches and add ons )

}
