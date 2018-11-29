import { Routes } from '@angular/router';
import { ColorModelTransformComponent } from './colormodeltransform';
import { NoContentComponent } from './no-content';
import { IntensitySliceComponent } from './intensityslice/intensityslice.component';
import { GrayToColorComponent } from './graytocolor/graytocolor.component';
import { SmoothenSharpenComponent } from './smoothensharpen/smoothensharpen.component';

export const ROUTES: Routes = [
  { path: '',      component: ColorModelTransformComponent },
  { path: 'colormodeltransform',  component: ColorModelTransformComponent },
  { path: 'intensityslice', component: IntensitySliceComponent },
  { path: 'graytocolor', component: GrayToColorComponent },
  { path: 'smoothensharpen', component: SmoothenSharpenComponent },
  { path: '**',    component: NoContentComponent },
];
