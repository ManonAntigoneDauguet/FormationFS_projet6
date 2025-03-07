import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionUserService } from '../services/sessionUser/session-user.service';
import { switchMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    constructor(private sessionUserService: SessionUserService) { }

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        return this.sessionUserService.isLogged$().pipe(
            take(1),
            switchMap(isLogged => {
                if (isLogged) {
                    request = request.clone({ withCredentials: true });
                }
                return next.handle(request);
            })
        );
    }
}
