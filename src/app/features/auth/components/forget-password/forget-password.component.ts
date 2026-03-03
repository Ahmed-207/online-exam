import { Component } from '@angular/core';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { InputTextModule } from 'primeng/inputtext';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  imports: [MainButtonComponent, InputTextModule],
  providers: [PrimeIcons],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {

}
