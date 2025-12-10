import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateApproverProfileComponent } from './update-approver-profile.component';

describe('UpdateApproverProfileComponent', () => {
  let component: UpdateApproverProfileComponent;
  let fixture: ComponentFixture<UpdateApproverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateApproverProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateApproverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
