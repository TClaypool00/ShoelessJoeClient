import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShoesComponent } from './user-shoes.component';

describe('UserShoesComponent', () => {
  let component: UserShoesComponent;
  let fixture: ComponentFixture<UserShoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
