import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TopicSubscription } from 'src/app/core/interfaces/topic-subscription.interface';
import { Topic } from '../interfaces/topic.interface';
import { TopicsService } from './topics.service';


describe('TopicsService', () => {
  let service: TopicsService;
  let httpMock: HttpTestingController;

  const listTopicsId: TopicSubscription[] = [{ id: 1, name: 'this topic 1' }];

  const mockTopic1: Topic = {
    id: 1,
    name: "this topic 1",
    content: "this content",
    subscriber: true
  }

  const mockTopic2: Topic = {
    id: 2,
    name: "this topic 2",
    content: "this content",
    subscriber: false
  }

  const mockTopicList = [mockTopic1, mockTopic2];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TopicsService]
    });
    service = TestBed.inject(TopicsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should filter topics for the user based on subscription', (done) => {
    // When
    service.getAllTopicsForUser(listTopicsId).subscribe(topics => {
      expect(topics.length).toBe(1);
      expect(topics[0]).toEqual(mockTopic1);
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTopicList);
  });
});
