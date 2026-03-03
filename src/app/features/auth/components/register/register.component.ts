import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-register',
  imports: [InputTextModule, InputNumberModule, PasswordModule, MainButtonComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

}
