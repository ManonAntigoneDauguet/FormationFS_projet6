import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Author } from 'src/app/core/interfaces/author.interface';
import { Topic } from '../../topics/interfaces/topic.interface';
import { PostComment } from '../interfaces/comment.interface';
import { Post } from '../interfaces/post.interface';
import { PostRequest } from '../interfaces/postRequest.interface';
import { PostsService } from './posts.service';


describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  const mockPostRequest: PostRequest = {
    title: "title",
    content: "content",
    topicId: 1,
  }

  const mockTopic: Topic = {
    id: 1,
    name: "this topic 1",
    content: "this content",
    subscriber: true
  }

  const mockAuthor: Author = {
    id: 1,
    username: "author"
  }

  const mockPost1: Post = {
    id: 1,
    title: "title1",
    content: "content1",
    createdAt: "'2023-02-27'",
    topic: mockTopic,
    author: mockAuthor
  }

  const mockPost2: Post = {
    id: 2,
    title: "title2",
    content: "content2",
    createdAt: "'2023-02-27'",
    topic: mockTopic,
    author: mockAuthor
  }

  const mockPostList: Post[] = [mockPost1, mockPost2];

  const mockComment: PostComment = {
    id: 1,
    content: "comment content",
    createdAt: "'2023-02-27'",
    author: mockAuthor
  }

  const mockCommentList: PostComment[] = [mockComment];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostsService]
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return a list of posts', (done) => {
    // When
    service.getAllPostsForUser().subscribe(posts => {
      expect(posts).toEqual(mockPostList);
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/subscriber`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPostList);
  })


  it('should return post information', (done) => {
    // When
    service.getPost("1").subscribe(posts => {
      expect(posts).toEqual(mockPost1);
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPost1);
  })


  it('should send a post', (done) => {
    // When
    service.savePost(mockPostRequest).subscribe(response => {
      expect(response).toBe('Success');
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('POST');
    req.flush("Success");
  })


  it('should get comments', (done) => {
    // When
    service.getAllCommentsForPost("1").subscribe(posts => {
      expect(posts).toEqual(mockCommentList);
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/1/comment`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCommentList);
  })


  it('should send a comment', (done) => {
    // When
    service.saveComment("1", { content: "content" }).subscribe(response => {
      expect(response).toBe('Success');
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/1/comment`);
    expect(req.request.method).toBe('POST');
    req.flush("Success");
  })
});
