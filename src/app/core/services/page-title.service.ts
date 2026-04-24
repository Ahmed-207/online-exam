import { Injectable, signal, computed } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  generalPageTitle = signal<string>('');
  private historyStack = signal<string[]>([]);

  private routeTitles: Record<string, string> = {
    '/home/diplomas': 'Diplomas',
    '/home/account': 'Account Setting',
    '/home/account/change-password': 'Change Password',
    '/home/dashboard': 'Dashboard',
  };

  breadcrumbs = computed<MenuItem[]>(() => {
    const history = this.historyStack().map((title) => ({ label: title }));
    const current = this.generalPageTitle();
    return current ? [...history, { label: current }] : history;
  });

  updateTitle(newTitle: string): void {
    const history = this.historyStack();
    const topLevelTitles = Object.values(this.routeTitles);
    const isTopLevel = topLevelTitles.includes(newTitle);

    if (isTopLevel) {
      this.historyStack.set([]);
    } else {
      const existingIndex = history.indexOf(newTitle);
      if (existingIndex !== -1) {
        this.historyStack.set(history.slice(0, existingIndex));
      } else if (this.generalPageTitle() && this.generalPageTitle() !== newTitle) {
        this.historyStack.update(h => [...h, this.generalPageTitle()]);
      }
    }

    this.generalPageTitle.set(newTitle);
  }

  updateTitleByUrl(url: string): void {
    const routes = Object.entries(this.routeTitles);
    const match = routes.find(([route]) => url === route);
    if (match) {
      const [_, newTitle] = match;
      if (this.generalPageTitle() !== newTitle) {
        this.updateTitle(newTitle);
      }
    }
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