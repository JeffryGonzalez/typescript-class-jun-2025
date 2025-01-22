import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.routes').then((r) => r.VEHICLE_ROUTES),
  },
];
