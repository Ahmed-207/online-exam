import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {

  btnClass: InputSignal<string> = input.required<string>()
  content: InputSignal<string> = input.required<string>();
  isLeftIcon: InputSignal<boolean | undefined> = input<boolean | undefined>();
  isRightIcon: InputSignal<boolean | undefined> = input<boolean | undefined>();
  leftIcon: InputSignal<string | undefined> = input<string | undefined>();
  rightIcon : InputSignal<string | undefined> = input<string| undefined>();
}
