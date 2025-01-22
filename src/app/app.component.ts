import { Component } from '@angular/core';

import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <a routerLink="vehicles" class="link">Vehicles</a>
    </div>
    <main class="container mx-auto">
      <router-outlet />
    </main>
  `,
  styles: [],
  imports: [RouterOutlet, RouterLink],
})
export class AppComponent {}
