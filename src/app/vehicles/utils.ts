import { Brand } from '@shared';
import { VehicleCreateModel } from './types';

export type NormalizedVehicle = Brand<VehicleCreateModel, 'cleaned'>;

export function normalizeVehicle(vehicle: VehicleCreateModel) {
  return {
    make: vehicle.make.trim().toUpperCase(),
    model: vehicle.model.trim().toUpperCase(),
    year: vehicle.year,
  } as NormalizedVehicle;
}
