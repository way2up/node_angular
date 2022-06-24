import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { LoaderService } from '../shared/services/loader.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        public router: Router,
        public loaderService: LoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()) {
            this.loaderService.subjectLoader.next(true);
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`,
                    // user_id: localStorage.getItem("user-id"),
                    remember: localStorage.getItem("remember")
                }
            })
        }
        return next.handle(req)
            .pipe(
                finalize(() => {
                    this.loaderService.subjectLoader.next(false);
                }),
                tap(event => {
                    // if (event instanceof HttpResponse) {
                    //     console.log(event.status, 4444);
                    // }
                }, error => {
                    if (error.status === 401 && error.statusText === 'Unauthorized') {
                        if (localStorage.getItem("remember") === 'true') {
                            localStorage.removeItem('accessToken');
                            this.auth.refreshToken(localStorage.getItem("refreshToken")).subscribe(
                                (data) => {
                                  console.log(data)
                                 
                                },
                                err => {
                                  console.log(err)
                                }
                              );
                        } else if(localStorage.getItem("remember") === 'false') {
                            this.auth.logout();
                            this.router.navigate(['auth']);
                        }
                    }
                })
            );
    }
}