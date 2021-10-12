import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../interfaces/IAuth';
import { tap } from 'rxjs/internal/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    public token = null;

    constructor(private http: HttpClient) { }


    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/login', user).pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token)
                    this.setToken(token)
                })
            )
        
    }

    setToken(token: string): void {
        this.token = token
    }

    getToken(): string {
       return this.token
    }

    isAuthenticated(): boolean {
        return !!this.token
    }

    logout(): void {
        this.setToken(null)
        localStorage.clear()
    }

    register(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/registration', user);
    }


    getUsers() {
        return this.http.get(`/api/getUsers`)
    }
}
