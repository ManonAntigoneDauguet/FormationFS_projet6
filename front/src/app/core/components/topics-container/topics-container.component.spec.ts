import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { TopicsContainerComponent } from './topics-container.component';

describe('TopicsContainerComponent', () => {
  let component: TopicsContainerComponent;
  let fixture: ComponentFixture<TopicsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
