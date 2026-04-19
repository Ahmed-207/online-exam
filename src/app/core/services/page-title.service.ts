import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  generalPageTitle = signal<string>('');
  private historyStack = signal<string[]>([]);

  breadcrumbs = computed<MenuItem[]>(() => {
    const history = this.historyStack().map((title) => ({ label: title }));
    const current = this.generalPageTitle();
    return current ? [...history, { label: current }] : history;
  });

  updateTitle(newTitle: string): void {
    const history = this.historyStack();
    const existingIndex = history.indexOf(newTitle);

    if (existingIndex !== -1) {

      this.historyStack.set(history.slice(0, existingIndex));
    } else if (this.generalPageTitle() && this.generalPageTitle() !== newTitle) {
      this.historyStack.update(h => [...h, this.generalPageTitle()]);
    }

    this.generalPageTitle.set(newTitle);
  }

  rollbackTitle(): void {
    const history = this.historyStack();
    if (history.length > 0) {
      const previous = history[history.length - 1];
      this.historyStack.update(h => h.slice(0, -1));
      this.generalPageTitle.set(previous);
    }
  }
}