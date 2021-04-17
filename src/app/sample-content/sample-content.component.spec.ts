import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleContentComponent } from './sample-content.component';

describe('SampleContentComponent', () => {
  let component: SampleContentComponent;
  let fixture: ComponentFixture<SampleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
