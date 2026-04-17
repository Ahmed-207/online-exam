import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ques-header',
  imports: [ProgressBarModule, ChartModule],
  templateUrl: './ques-header.component.html',
  styleUrl: './ques-header.component.css',
})
export class QuesHeaderComponent {
  data: any;
  options: any;
  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);
  ngOnInit() {
    this.initChart();
  }

  // will integrate it with the timer and remove the whole chart after the exam end 
  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');

      this.data = {
        labels: ['A', 'B'],
        datasets: [
          {
            data: [300, 50],
            backgroundColor: [documentStyle.getPropertyValue('--p-blue-600'), documentStyle.getPropertyValue('--p-blue-100'), documentStyle.getPropertyValue('--p-gray-500')],
          }
        ]
      };

      this.options = {
        cutout: '60%',
        plugins: {
          legend: {
            display: false
          }
        }
      };
    }
    this.cd.markForCheck();
  }


}
