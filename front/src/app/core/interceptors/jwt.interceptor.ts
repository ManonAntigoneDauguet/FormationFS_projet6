import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {

    constructor() { }

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        request = request.clone({ withCredentials: true });
        return next.handle(request);
    }
}
