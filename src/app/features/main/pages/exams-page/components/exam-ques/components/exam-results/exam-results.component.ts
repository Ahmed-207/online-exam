import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { FormsModule } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';


@Component({
  selector: 'app-exam-results',
  imports: [ChartModule, RadioButtonModule, FormsModule],
  templateUrl: './exam-results.component.html',
  styleUrl: './exam-results.component.css',
})
export class ExamResultsComponent {

  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);
  wrongAnswer:string = 'wrong';
  rightAnswer:string = 'right';
  ngOnInit() {
    this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      this.data = {
        labels: ['Correct : 0', 'Incorrect : 0'],
        datasets: [
          {
            data: [300, 50],
            backgroundColor: [documentStyle.getPropertyValue('--p-emerald-500'), documentStyle.getPropertyValue('--p-red-500'), documentStyle.getPropertyValue('--p-gray-500')],
          }
        ]
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            align: 'start',
            labels: {
              color: textColor,
              boxWidth: 15,
              padding: 15,
              align: 'vertical',
              font: {
                size: 14,
                weight: '500',
                family: 'monospace'
              }
            }
          }
        }
      };
    }
    this.cd.markForCheck();
  }


}
