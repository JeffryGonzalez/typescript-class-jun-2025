import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { VehicleCreateModel } from '../types/';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { ApiVehicle, VehicleApiService } from './vehicle-api.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { NormalizedVehicle } from '../utils';
export const VehicleStore = signalStore(
  withEntities<ApiVehicle>(),
  withDevtools('vehicles'),
  withMethods((store) => {
    const service = inject(VehicleApiService);
    return {
      add: rxMethod<NormalizedVehicle>(
        pipe(
          mergeMap((v) =>
            service.addVehicle(v).pipe(
              tapResponse({
                next: (v) => patchState(store, addEntity(v)),
                error(error) {
                  console.log(error);
                },
              }),
            ),
          ),
        ),
      ),
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
