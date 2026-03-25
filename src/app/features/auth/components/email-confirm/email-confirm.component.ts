import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { MainButtonComponent } from "../../../../shared/components/main-button/main-button.component";

@Component({
  selector: 'app-email-confirm',
  imports: [InputTextModule, MainButtonComponent],
  templateUrl: './email-confirm.component.html',
  styleUrl: './email-confirm.component.css',
})
export class EmailConfirmComponent {

}
