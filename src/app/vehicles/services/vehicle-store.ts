import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { Vehicle } from '../types/';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { VehicleApiService } from './vehicle-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
export const VehicleStore = signalStore(
  withEntities<Vehicle>(),
  withDevtools('vehicles'),
  withMethods((store) => {
    const service = inject(VehicleApiService);
    return {
      _load: rxMethod<void>(
        pipe(
          switchMap(() =>
            service.loadVehicles().pipe(
              tapResponse({
                next: (value) => patchState(store, setEntities(value)),
                error: (e) => console.log('error', e),
              }),
            ),
          ),
        ),
      ),
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
