import { Component, input, InputSignal } from '@angular/core';
import { CircleX, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-alert-message',
  imports: [LucideAngularModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.css',
})
export class AlertMessageComponent {

  alertContent:InputSignal<string> = input.required<string>();
  readonly circleX = CircleX

}
