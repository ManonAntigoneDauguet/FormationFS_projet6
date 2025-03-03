import { TestBed } from '@angular/core/testing';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { SessionUserService } from './session-user.service';


describe('SessionUserService', () => {
  let service: SessionUserService;

  const mockUser: User = {
    id: 1,
    username: 'user',
    email: 'test@test.fr',
    subscriptions: []
  };

  const mockNewUser: User = {
    id: 1,
    username: 'new',
    email: 'newt@test.fr',
    subscriptions: []
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionUserService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return false on isLogged$() and a null user on getUser$() on init', (done) => {
    let assertionsCompleted = 0;

    service.isLogged$().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
    service.getUser$().subscribe((user) => {
      expect(user).toBeNull();
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
  });


  it('should return true on isLogged$() and the connected user on getUser$() after a successful login', (done) => {
    let assertionsCompleted = 0;
    // Given
    service.login(mockUser);
    // Then
    service.isLogged$().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
    service.getUser$().subscribe((user) => {
      expect(user).toBe(mockUser);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
  })


  it('should return false on isLogged$() and a null user on getUser$() after a logout', (done) => {
    let assertionsCompleted = 0;
    // Given
    service.login(mockUser);
    // When
    service.logout();
    // Then
    service.isLogged$().subscribe((isLogged) => {
      expect(isLogged).toBe(false);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
    service.getUser$().subscribe((user) => {
      expect(user).toBeNull();
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
  })


  it('should return true on isLogged$() and new user information on getUser$() after an updateUser', (done) => {
    let assertionsCompleted = 0;
    // Given
    service.login(mockUser);
    // When
    service.updateUser(mockNewUser);
    // Then
    service.isLogged$().subscribe((isLogged) => {
      expect(isLogged).toBe(true);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
    service.getUser$().subscribe((user) => {
      expect(user).toBe(mockNewUser);
      assertionsCompleted++;
      if (assertionsCompleted === 2) done();
    });
  })
});
