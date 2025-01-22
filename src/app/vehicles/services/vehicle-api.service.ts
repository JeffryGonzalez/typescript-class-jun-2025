import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Vehicle, VehicleCreateModel } from '../types';
import { Brand } from '@shared';
import { map, Observable } from 'rxjs';

export type ApiVehicle = Brand<Vehicle, 'api-vehicles'>;

export class VehicleApiService {
  #client = inject(HttpClient);

  loadVehicles(): Observable<ApiVehicle[]> {
    return this.#client
      .get<Vehicle[]>('/api/vehicles')
      .pipe(
        map((vehicles) =>
          vehicles.map((v) => v as Brand<Vehicle, 'api-vehicles'>),
        ),
      );
  }

  addVehicle(vehicle: VehicleCreateModel) {
    return this.#client
      .post<Vehicle>('/api/vehicles', vehicle)
      .pipe(map((v) => v as Brand<Vehicle, 'api-vehicles'>));
  }
}
