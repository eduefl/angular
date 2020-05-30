import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMsgComponent } from './generic-msg.component';

describe('GenericMsgComponent', () => {
  let component: GenericMsgComponent;
  let fixture: ComponentFixture<GenericMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
