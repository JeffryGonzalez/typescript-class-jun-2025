import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { VehicleStore } from '../services/vehicle-store';

@Component({
  selector: 'app-vehicle-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    @if (store.hasError()) {
      <div class="alert alert-error">
        <p>{{ store.getError() }}</p>
      </div>
    } @else {
      @if (store.isLoading()) {
        <div class="alert alert-info">
          <p>Loading Your Vehicles</p>
        </div>
      } @else {
        <ul>
          @for (vehicle of store.entities(); track vehicle.id) {
            <li>
              <p>
                {{ vehicle.id }} is a {{ vehicle.make }} by {{ vehicle.model }},
                from {{ vehicle.year }}
              </p>
            </li>
          } @empty {
            <li>
              <p>You have no vehicles!</p>
            </li>
          }
        </ul>
      }
    }
  `,
  styles: ``,
})
export class ListComponent {
  store = inject(VehicleStore);
}
