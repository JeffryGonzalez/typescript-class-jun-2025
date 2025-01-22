import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap } from 'rxjs';
import { NormalizedVehicle } from '../utils';
import { ApiVehicle, VehicleApiService } from './vehicle-api.service';
export const VehicleStore = signalStore(
  withState<{ error: string | null }>({
    error: null,
  }),
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
                error(e) {
                  console.log(e);
                  patchState(store, {
                    error: 'Bad API Request for Vehicles - Check with Ray',
                  });
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
