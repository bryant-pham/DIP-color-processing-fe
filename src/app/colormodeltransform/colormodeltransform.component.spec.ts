import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  inject,
  async,
  TestBed,
  ComponentFixture,
  getTestBed
} from '@angular/core/testing';
import { Component } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

/**
 * Load the implementations that should be tested.
 */
import { AppState } from '../app.service';
import { ColorModelTransformComponent } from './colormodeltransform.component';
import { Title } from './title';

describe(`Home`, () => {
  let comp: ColorModelTransformComponent;
  let fixture: ComponentFixture<ColorModelTransformComponent>;
  let injector: TestBed;
  let service: AppState;
  let httpMock: HttpTestingController;

  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorModelTransformComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [AppState, Title]
    })

      /**
       * Compile template and css.
       */
      .compileComponents();
    injector = getTestBed();
    service = injector.get(AppState);
    httpMock = injector.get(HttpTestingController);
  }));

  /**
   * Synchronous beforeEach.
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ColorModelTransformComponent);
    comp = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    fixture.detectChanges();
  });

  it('should have default data', () => {
    expect(comp.localState).toEqual({ value: '' });
  });

  it('should have a title', () => {
    expect(!!comp.title).toEqual(true);
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
