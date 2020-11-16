import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowActionDialogComponent } from './borrow-action-dialog.component';

describe('BorrowActionDialogComponent', () => {
  let component: BorrowActionDialogComponent;
  let fixture: ComponentFixture<BorrowActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
