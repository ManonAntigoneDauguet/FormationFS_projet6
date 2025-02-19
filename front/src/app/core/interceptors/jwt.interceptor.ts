import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionUserService } from '../services/sessionUser/session-user.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    constructor(private sessionUserService: SessionUserService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.sessionUserService.isLogged) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.sessionUserService.getToken()}`,
                },
            });
        }
        return next.handle(request);
    }
}
