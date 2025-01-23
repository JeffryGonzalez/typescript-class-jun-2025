import { Routes } from '@angular/router';
import { IceCreamComponent } from './ice-cream/ice-cream.component';

export const routes: Routes = [
  {
    path: 'ice-cream',
    component: IceCreamComponent,
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./vehicles/vehicles.routes').then((r) => r.VEHICLE_ROUTES),
  },
];
