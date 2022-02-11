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
    public user_role = null;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<{ token: string, user: User}> {
        return this.http.post<{ token: string, user: User }>('/api/login', user).pipe(
            tap(
                ({token, user}) => {
                    localStorage.setItem('auth-token', token)
                    localStorage.setItem('user-id', user._id)
                    localStorage.setItem('user-role', user.role)
                    localStorage.setItem('user-email', user.email)
                    localStorage.setItem('user-fullName', user.fullName)
                    this.setToken(token, user.role)
                })
            )
        
    }

    setToken(token: string, role: string): void {
        this.token = token;
        this.user_role = role;
    }

    getToken(): string {
       return localStorage.getItem("auth-token")
    }

    isAuthenticatedAdmin(): boolean {
        return !localStorage.getItem("auth-token") || localStorage.getItem("user-role") !== 'Admin' ? false : true;
    }

    isAuthenticated(): boolean {
        return !localStorage.getItem("auth-token") || !localStorage.getItem("user-role") ? false : true; ;
    }

    logout(): void {
        this.setToken(null, null)
        localStorage.clear()
    }

    register(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/registration', user);
    }

    getUsers() {
        return this.http.get(`/api/getUsers`)
    }
}
