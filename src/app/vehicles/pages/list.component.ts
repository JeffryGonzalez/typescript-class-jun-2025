import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { VehicleStore } from '../services/vehicle-store';

@Component({
  selector: 'app-vehicle-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>List</p>

    <ul>
      @for (vehicle of store.entities(); track vehicle.id) {
        <li>
          <p>
            {{ vehicle.id }} is a {{ vehicle.make }} by {{ vehicle.model }},
            from {{ vehicle.year }}
          </p>
        </li>
      }
    </ul>
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(VehicleStore);
}
