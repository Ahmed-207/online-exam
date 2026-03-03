import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-login',
  imports: [InputTextModule, PasswordModule, MainButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

}
