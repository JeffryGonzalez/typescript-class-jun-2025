import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Brand } from '@shared';
import { map, Observable } from 'rxjs';
import { Vehicle, VehicleCreateModel, VehiclesSchema } from '../types';

export type ApiVehicle = Brand<Vehicle, 'api-vehicles'>;

export class VehicleApiService {
  #client = inject(HttpClient);

  loadVehicles(): Observable<ApiVehicle[]> {
    return this.#client.get<Vehicle[]>('/api/vehicles').pipe(
      map((v) => {
        const r = VehiclesSchema.safeParse(v);
        if (r.success) {
          return r.data;
        } else {
          throw new Error('Zod Error ' + r.error);
        }
      }),
      map((vehicles) => vehicles.map((v) => v as ApiVehicle)),
    );
  }

  addVehicle(vehicle: VehicleCreateModel) {
    return this.#client
      .post<Vehicle>('/api/vehicles', vehicle)
      .pipe(map((v) => v as ApiVehicle));
  }
}
