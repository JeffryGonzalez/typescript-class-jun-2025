import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Vehicle, VehicleCreateModel } from '../types';

export class VehicleApiService {
  #client = inject(HttpClient);

  loadVehicles() {
    return this.#client.get<Vehicle[]>('/api/vehicles');
  }

  addVehicle(vehicle: VehicleCreateModel) {
    return this.#client.post<Vehicle>('/api/vehicles', vehicle);
  }
}
