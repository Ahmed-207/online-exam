import { Component } from '@angular/core';
import { InputOtpModule } from 'primeng/inputotp';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-verify-otp',
  providers:[PrimeIcons],
  imports: [InputOtpModule, MainButtonComponent],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css',
})
export class VerifyOtpComponent {

  counterFlag:Boolean = false;

}
