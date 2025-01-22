import { Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { ListComponent } from './pages/list.component';
import { EntryComponent } from './pages/entry.component';
export const VEHICLE_ROUTES: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'entry',
        component: EntryComponent,
      },
    ],
  },
];
