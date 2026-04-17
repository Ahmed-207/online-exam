import { Component } from '@angular/core';
import { MainSidebarComponent } from "../../../features/main/components/main-sidebar/main-sidebar.component";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { MainHeaderComponent } from "../../../features/main/components/main-header/main-header.component";
import { ExamQuesComponent } from "../../../features/main/pages/exams-page/components/exam-ques/exam-ques.component";

@Component({
  selector: 'app-main-layout',
  imports: [MainSidebarComponent, BreadcrumbModule, MainHeaderComponent, ExamQuesComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  items: MenuItem[] = [{ label: 'Components' }, { label: 'Form' }, { label: 'InputText', routerLink: '/inputtext' }];
  home: MenuItem = { icon: 'pi pi-home', routerLink: '/' };


  // integrate the routing with breadcrumb ( pdf in the searches and add ons )

}
