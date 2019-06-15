
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpRequest, HttpHandler,
    HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                switch (error.status) {
                    case 401:
                        // refresh token
                        break;
                    case 403:
                        this.router.navigateByUrl('/no-permission');
                        return empty();
                        break;
                    default:
                        return throwError(error);
                }
            })
        );
    }
}