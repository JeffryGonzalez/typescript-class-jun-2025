import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Brand } from '@shared';
import { map, Observable } from 'rxjs';
import { Vehicle, VehicleCreateModel, VehiclesSchema } from '../types';
import { environment } from '../../../environments/environment';

export type ApiVehicle = Brand<Vehicle, 'api-vehicles'>;

export class VehicleApiService {
  #client = inject(HttpClient);
  #baseUrl = environment.vehicleApi;

  loadVehicles(): Observable<ApiVehicle[]> {
    return this.#client.get<Vehicle[]>(`${this.#baseUrl}api/vehicles`).pipe(
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
      .post<Vehicle>(`${this.#baseUrl}api/vehicles`, vehicle)
      .pipe(map((v) => v as ApiVehicle));
  }
}
