import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsContainerComponent } from 'app/core/components/topics-container/topics-container.component';
import { TopicListComponent } from './topic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopicListComponent', () => {
  let component: TopicListComponent;
  let fixture: ComponentFixture<TopicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopicsContainerComponent,
        HttpClientTestingModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TopicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
