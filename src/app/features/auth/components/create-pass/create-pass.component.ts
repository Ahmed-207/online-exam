import { Component } from '@angular/core';
import { PasswordModule } from 'primeng/password';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-create-pass',
  imports: [PasswordModule, MainButtonComponent],
  templateUrl: './create-pass.component.html',
  styleUrl: './create-pass.component.css',
})
export class CreatePassComponent {

}
