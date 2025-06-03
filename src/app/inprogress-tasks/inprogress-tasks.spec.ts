import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InprogressTasks } from './inprogress-tasks';

describe('InprogressTasks', () => {
  let component: InprogressTasks;
  let fixture: ComponentFixture<InprogressTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InprogressTasks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InprogressTasks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
