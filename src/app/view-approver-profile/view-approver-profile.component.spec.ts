import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApproverProfileComponent } from './view-approver-profile.component';

describe('ViewApproverProfileComponent', () => {
  let component: ViewApproverProfileComponent;
  let fixture: ComponentFixture<ViewApproverProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewApproverProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewApproverProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
