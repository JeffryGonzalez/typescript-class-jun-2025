import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { VehicleStore } from '../services/vehicle-store';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VehicleCreateModel } from '../types';
import { FormModel } from '@shared';
import { normalizeVehicle } from '../utils';
@Component({
  selector: 'app-vehicle-entry',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule],
  template: `
    <p>Vehicle Entry</p>
    <p>You have {{ store.entities().length }} vehicles. Add Some More?</p>

    <form [formGroup]="form" (ngSubmit)="addVehicle()">
      <div class="form-control">
        <label for="make" class="label"
          >Make
          <input
            formControlName="make"
            class="input input-primary input-bordered"
            id="make"
          />
        </label>
      </div>
      <div class="form-control">
        <label for="model" class="label"
          >Model
          <input
            formControlName="model"
            class="input input-primary input-bordered"
            id="model"
          />
        </label>
      </div>
      <div class="form-control">
        <label for="year" class="label"
          >Year
          <input
            formControlName="year"
            class="input input-primary input-bordered"
            id="year"
            type="number"
          />
        </label>
      </div>
      <button type="submit" class="btn btn-primary">Add This Vehicle</button>
    </form>
  `,
  styles: ``,
})
export class EntryComponent {
  store = inject(VehicleStore);

  form = new FormGroup<FormModel<VehicleCreateModel>>({
    make: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    model: new FormControl('', { nonNullable: true }),
    year: new FormControl(2025, {
      nonNullable: true,
      validators: [Validators.min(1986)],
    }),
  });

  addVehicle() {
    if (this.form.valid) {
      // you must get the data from the form
      const dataFromForm = this.form.getRawValue();
      // run it through the normalizer
      const vehicleToAdd = normalizeVehicle(dataFromForm);
      // and then you can add it to the store.
      this.store.add(vehicleToAdd);
    } else {
      alert('Get real, bra!~');
    }
  }
}
