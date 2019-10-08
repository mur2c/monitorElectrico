import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewconfigPage } from './viewconfig.page';

describe('ViewconfigPage', () => {
  let component: ViewconfigPage;
  let fixture: ComponentFixture<ViewconfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewconfigPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewconfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
