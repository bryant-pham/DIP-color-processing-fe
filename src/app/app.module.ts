import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { ColorModelTransformComponent } from './colormodeltransform';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { DevModuleModule } from './+dev-module';

import '../styles/styles.scss';
import '../styles/headings.css';
import { ImageProcessingService } from './services/imageprocessing.service';
import { IntensitySliceComponent } from './intensityslice/intensityslice.component';
import { imageReducer } from './reducers/image.reducer';
import { ImageBarComponent } from './imagebar/imagebar.component';
import { selectedImageReducer } from './reducers/selectedimage.reducer';
import { SelectedImageService } from './services/selectedimage.service';
import { GrayToColorComponent } from './graytocolor/graytocolor.component';
import { SmoothenSharpenComponent } from './smoothensharpen/smoothensharpen.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ErrorComponent } from './error/error.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  ImageProcessingService,
  SelectedImageService
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    ColorModelTransformComponent,
    IntensitySliceComponent,
    ImageBarComponent,
    GrayToColorComponent,
    SmoothenSharpenComponent,
    SpinnerComponent,
    ErrorComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === false,
      preloadingStrategy: PreloadAllModules
    }),
    StoreModule.forRoot({
      images: imageReducer,
      selectedImage: selectedImageReducer
    }),

    /**
     * This section will import the `DevModuleModule` only in certain build types.
     * When the module is not imported it will get tree shaked.
     * This is a simple example, a big app should probably implement some logic
     */
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {}
