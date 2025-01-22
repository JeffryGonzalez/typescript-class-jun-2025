import { http, HttpResponse, delay } from 'msw';
import { Vehicle, VehicleCreateModel } from '../app/vehicles/types';

const fakeData = [
  {
    id: '9999',
    make: 'Ford',
    model: 'Bronco',
    year: 2021,
    historyOfClaims: ['bad wreck', 'broken windshield'],
  },
];
export const VehiclesHandlers = [
  http.post('/api/vehicles', async ({ request }) => {
    const requestBody = (await request.json()) as unknown as VehicleCreateModel;

    const vehicleToAdd = {
      id: crypto.randomUUID(),
      historyOfClaims: [],
      ...requestBody,
    };
    fakeData.push(vehicleToAdd);
    return HttpResponse.json(vehicleToAdd);
  }),
  http.get('/api/vehicles', async () => {
    await delay(2000);
    return HttpResponse.json(fakeData);
  }),
];
