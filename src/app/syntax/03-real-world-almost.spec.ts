import { Vehicle } from './vehicles';
import {
  doAllowedVehicleUpdate,
  updateVehicleMake,
  updateVehicleYear,
} from './vehicles/vehicle';

describe('A fake but realistic use of typeScript and Types', () => {
  it('A vehicle type', () => {
    const myCar: Vehicle = {
      vin: '9999',
      make: 'Ford',
      model: 'Bronco',
      year: 2021,
    };

    const result = updateVehicleMake(myCar, 'Ferrari');
    expect(result).toEqual({
      vin: '9999',
      make: 'Ferrari',
      model: 'Bronco',
      year: 2021,
    });

    const result2 = updateVehicleYear(myCar, 2023);

    expect(result2).toEqual({
      vin: '9999',
      make: 'Ford',
      model: 'Bronco',
      year: 2023,
    });

    const result3 = doAllowedVehicleUpdate(myCar, 'drivers', [
      'Henry',
      'Violet',
    ]);
  });
});
