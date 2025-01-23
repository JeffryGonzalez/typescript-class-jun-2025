import { delay, http, HttpResponse } from 'msw';
import { VehicleCreateModel } from '../app/vehicles/types';

const fakeData: unknown[] = [
  {
    id: '9999',
    make: 'Ford',
    model: 'Bronco',
    year: 2021,
    historyOfClaims: ['bad wreck', 'broken windshield'],
  },
];
export const VehiclesHandlers = [
  http.post('https://test.internal.com/api/vehicles', async ({ request }) => {
    const requestBody = (await request.json()) as unknown as VehicleCreateModel;

    const vehicleToAdd = {
      id: crypto.randomUUID(),
      historyOfClaims: [],
      ...requestBody,
    };
    fakeData.push(vehicleToAdd);
    return HttpResponse.json(vehicleToAdd);
  }),
  http.get('https://test.internal.com/api/vehicles', async () => {
    await delay(2000);
    return HttpResponse.json(fakeData);
  }),
];
