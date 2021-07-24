import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyComponent } from './busy.component';
import { Subscription } from 'rxjs';
import { NgBusyModule } from 'ng-busy';

describe('BusyComponent', () => {
  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ BusyComponent ],
      imports: [ NgBusyModule ]
    })
    .compileComponents();
  });

  let component: BusyComponent;
  let fixture: ComponentFixture<BusyComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BusyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('初期化出来ること。', () => {
    // Assert
    expect(component).toBeTruthy();
  });

  it('wrapContentが設定出来ること。', () => {
    // Arrange・Act
    component.wrapContent = true;

    // Assert
    expect(component.wrapContent).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('正常実施出来ること。', () => {
      // Arrange
      component.manualBusySubscription = new Subscription();
      component.config.busy.push(new Subscription());

      // Act
      component.ngOnDestroy();

      // Assert
      expect(component.manualBusySubscription.closed).toBeTruthy();
      expect(component.config.busy.length).toEqual(1);
      expect((component.config.busy[0] as Subscription).closed).toBeTruthy();
    });
  });

  describe('add', () => {
    it('正常実施出来ること。', () => {
      // Arrange
      const subscription = new Subscription();

      // Act
      component.add(subscription);

      // Assert
      expect(component.config.busy.length).toEqual(1);
    });
  });

  describe('start', () => {
    it('正常実施出来ること。', () => {
      // Act
      component.start();

      // Assert
      expect(component.manualBusySubscription.closed).toBeFalsy();
    });
  });

  describe('stop', () => {
    it('正常実施出来ること。', () => {
      // Arrange
      component.start();

      // Act
      component.stop();

      // Assert
      expect(component.manualBusySubscription.closed).toBeTruthy();
    });
  });

});
