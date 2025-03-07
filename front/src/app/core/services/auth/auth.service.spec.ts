import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { LoginRequest } from 'src/app/feature/auth/interfaces/loginRequest.interface';
import { RegisterRequest } from 'src/app/feature/auth/interfaces/registerRequest.interface';
import { User } from 'src/app/feature/profile/interfaces/user.interface';
import { TokenApiResponse } from '../../interfaces/token-api-response.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockLoginRequest: LoginRequest = {
    email: "test@test.fr",
    password: "password"
  };

  const mockTokenResponse: TokenApiResponse = {
    token: 'token'
  };

  const mockUserResponse: User = {
    id: 1,
    username: 'user',
    email: 'test@test.fr',
    subscriptions: []
  };

  const mockRegisterRequest: RegisterRequest = {
    username: 'user',
    email: 'user@example.com',
    password: 'password'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should login and get user profile', (done) => {
    // When
    service.login(mockLoginRequest).subscribe(user => {
      expect(user).toEqual(mockUserResponse);
      done();
    });
    // Then
    const loginRequest = httpMock.expectOne(`${service['pathService']}/login`);
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush(mockTokenResponse);

    const getProfileRequest = httpMock.expectOne(`${service['pathService']}`);
    expect(getProfileRequest.request.method).toBe('GET');
    getProfileRequest.flush(mockUserResponse);
  });


  it('should return an error in case of bad correspondance between password and email', (done) => {
    // When
    service.login(mockLoginRequest).subscribe(
      () => {
        fail('Expected an error, but the login succeeded');
      },
      (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Error');
        done();
      }
    );
    // Then
    const loginRequest = httpMock.expectOne(`${service['pathService']}/login`);
    expect(loginRequest.request.method).toBe('POST');
    loginRequest.flush('Error', { status: 401, statusText: 'Error' });
  });


  it('should register a user', (done) => {
    service.register(mockRegisterRequest).subscribe(response => {
      expect(response).toBe('Success');
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush('Success');
  });


  it('should return an error when error in register request', (done) => {
    service.register(mockRegisterRequest).subscribe(
      () => {
        fail('Expected an error, but the login succeeded');
      },
      (error) => {
        expect(error.status).toBe(403);
        expect(error.statusText).toBe('Error');
        done();
      }
    );
    // Then
    const req = httpMock.expectOne(`${service['pathService']}/register`);
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 403, statusText: 'Error' });
  });


  it('should get user profile', (done) => {
    // When
    service.getProfile().subscribe(user => {
      expect(user).toEqual(mockUserResponse);
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserResponse);
  });


  it('should return error on a getProfile without authentication', (done) => {
    // When
    service.getProfile().subscribe(
      () => {
        fail('Expected an error, but the login succeeded');
      },
      (error) => {
        expect(error.status).toBe(401);
        expect(error.statusText).toBe('Error');
        done();
      }
    );
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('GET');
    req.flush('Error', { status: 401, statusText: 'Error' });
  });


  it('should update user profile', (done) => {
    // When  
    service.updateProfile(mockRegisterRequest).subscribe(response => {
      expect(response).toBe('Success');
      done();
    });
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Success');
  });


  it('should return an error in case of bad request on updateProfile', (done) => {
    // When  
    service.updateProfile(mockRegisterRequest).subscribe(
      () => {
        fail('Expected an error, but the login succeeded');
      },
      (error) => {
        expect(error.status).toBe(403);
        expect(error.statusText).toBe('Error');
        done();
      }
    );
    // Then
    const req = httpMock.expectOne(`${service['pathService']}`);
    expect(req.request.method).toBe('PUT');
    req.flush('Error', { status: 403, statusText: 'Error' });
  });
});


