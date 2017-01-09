/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DecadePickerComponent } from './decade-picker.component';

describe('DecadePickerComponent', () => {
  let component: DecadePickerComponent;
  let fixture: ComponentFixture<DecadePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecadePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecadePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
