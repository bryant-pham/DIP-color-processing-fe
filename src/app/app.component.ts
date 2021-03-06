/**
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'environments/environment';
import { AppState } from './app.service';

export const ROOT_SELECTOR = 'app';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./colormodeltransform'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Color Model Transform
      </a>
      <a [routerLink]=" ['./intensityslice'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Intensity Slicing
      </a>
      <a [routerLink]=" ['./graytocolor'] "
         routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Grayscale to Color
      </a>
      <a [routerLink]=" ['./smoothensharpen'] "
         routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Smoothen/Sharpen
      </a>
    </nav>

    <main>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-10">
            <router-outlet></router-outlet>
          </div>
          <div class="col-md-2">
            <image-bar></image-bar>
          </div>
        </div>
      </div>
    </main>
  `
})
export class AppComponent implements OnInit {
  public name = 'Angular Starter';
  public tipe = 'assets/img/tipe.png';
  public twitter = 'https://twitter.com/gdi2290';
  public url = 'https://tipe.io';
  public showDevModule: boolean = environment.showDevModule;

  constructor(
    public appState: AppState
  ) {}

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/**
 * Please review the https://github.com/AngularClass/angular-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
