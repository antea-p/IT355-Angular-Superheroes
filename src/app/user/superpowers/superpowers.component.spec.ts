import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperpowersComponent } from './superpowers.component';

describe('SuperpowersComponent', () => {
  let component: SuperpowersComponent;
  let fixture: ComponentFixture<SuperpowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperpowersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperpowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
