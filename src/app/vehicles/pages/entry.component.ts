import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { VehicleStore } from '../services/vehicle-store';

@Component({
  selector: 'app-vehicle-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <p>Vehicle Entry</p>
    <p>You have {{ store.entities().length }} vehicles. Add Some More?</p>
  `,
  styles: ``,
})
export class EntryComponent {
  store = inject(VehicleStore);
}
