import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="flex gap-4">
      <a routerLink="vehicles" class="link">Vehicles</a>
      <a routerLink="ice-cream" class="link">Order Ice Cream</a>
    </div>
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
