import {RouterModule, Routes} from '@angular/router';

import {DayComponent} from './comp.day';
import {TimeComponent} from './comp.time';
import {DatePickerComponent} from "./comp.datepicker";
import {CategoriesComponent} from "./comp.categories";

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/day',
    pathMatch: 'full'
  },
  {
    path: 'day',
    component: DayComponent
  },
  {
    path: 'time',
    component: TimeComponent
  },
  {
    path: 'date',
    component: DatePickerComponent
  },
  {
    path: 'cats',
    component: CategoriesComponent
  }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
