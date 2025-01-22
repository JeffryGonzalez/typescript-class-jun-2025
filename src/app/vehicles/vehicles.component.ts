import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VehicleStore } from './services/vehicle-store';
import { VehicleApiService } from './services/vehicle-api.service';

@Component({
  selector: 'app-vehicles',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink],
  providers: [VehicleStore, VehicleApiService],
  template: `
    <p>Vehicles</p>
    <div class="flex gap-4">
      <a class="link m-4" routerLink="entry">Add A Vehicle</a>
      <a class="link m-4" routerLink="list">List</a>
    </div>
    <div class="p-8">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class VehiclesComponent {
  store = inject(VehicleStore);
}
