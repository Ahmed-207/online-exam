import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-repass',
  imports: [PasswordModule, MainButtonComponent],
  templateUrl: './repass.component.html',
  styleUrl: './repass.component.css',
})
export class RepassComponent {

}
