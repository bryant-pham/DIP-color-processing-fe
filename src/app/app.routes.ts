import { Routes } from '@angular/router';
import { ColorModelTransformComponent } from './colormodeltransform';
import { NoContentComponent } from './no-content';
import { IntensitySliceComponent } from './intensityslice/intensityslice.component';

export const ROUTES: Routes = [
  { path: '',      component: ColorModelTransformComponent },
  { path: 'colormodeltransform',  component: ColorModelTransformComponent },
  { path: 'intensityslice', component: IntensitySliceComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
