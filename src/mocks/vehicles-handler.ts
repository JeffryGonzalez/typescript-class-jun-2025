import { http, HttpResponse } from 'msw';
import { Vehicle } from '../app/vehicles/types';

const fakeData: Vehicle[] = [
  {
    id: '9999',
    make: 'Ford',
    model: 'Bronco',
    year: 2021,
  },
];
export const VehiclesHandlers = [
  http.get('/api/vehicles', () => HttpResponse.json(fakeData)),
];
