import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { mergeMap, pipe, switchMap, tap } from 'rxjs';
import { ZodError } from 'zod';
import {
  setError,
  setIdle,
  setLoading,
  setMutating,
  withApiFeature,
} from '../../shared/api.feature';
import { NormalizedVehicle } from '../utils';
import { ApiVehicle, VehicleApiService } from './vehicle-api.service';
export const VehicleStore = signalStore(
  withApiFeature(),

  withEntities<ApiVehicle>(),
  withDevtools('vehicles'),
  withMethods((store) => {
    const service = inject(VehicleApiService);
    return {
      add: rxMethod<NormalizedVehicle>(
        pipe(
          tap(() => patchState(store, setMutating())),
          mergeMap((v) =>
            service.addVehicle(v).pipe(
              tapResponse({
                next: (v) => patchState(store, addEntity(v)),
                error(e) {
                  console.log(e);
                  patchState(store, setError('Bad Request'));
                },
              }),
            ),
          ),
        ),
      ),
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setLoading())),
          switchMap(() =>
            service.loadVehicles().pipe(
              tapResponse({
                next: (value) =>
                  patchState(store, setEntities(value), setIdle()),
                error: (e: ZodError) =>
                  patchState(
                    store,

                    setError('Bad Api Response'),
                  ),
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
