import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorPage } from './monitor.page';

describe('MonitorPage', () => {
  let component: MonitorPage;
  let fixture: ComponentFixture<MonitorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonitorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
