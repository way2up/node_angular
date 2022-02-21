import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../interfaces/IAuth';
import { tap } from 'rxjs/internal/operators';

export interface UserChangePassword {
    userId? : string,
    message?: string,
    email?: string
   }

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public token = null;
    public user_role = null;

    constructor(private http: HttpClient) { }

    login(user: User): Observable<{ tokens: any, user: User}> {
        return this.http.post<{ tokens: any, user: User }>('/api/login', user).pipe(
            tap(
                ({tokens, user}) => {
                    localStorage.setItem('accessToken', tokens[`accessToken`])
                    localStorage.setItem('refreshToken', tokens[`refreshToken`])
                    localStorage.setItem('user-id', user._id)
                    localStorage.setItem('user-role', user.role)
                    localStorage.setItem('user-email', user.email)
                    localStorage.setItem('user-fullName', user.fullName)
                    this.setToken(tokens, user.role)
                })
            )
        
    }

    setToken(token: string, role: string): void {
        this.token = token;
        this.user_role = role;
    }

    getToken(): string {
       return localStorage.getItem("accessToken")
    }

    isAuthenticatedAdmin(): boolean {
        return !localStorage.getItem("accessToken") || localStorage.getItem("user-role") !== 'Admin' ? false : true;
    }

    isAuthenticated(): boolean {
        return !localStorage.getItem("accessToken") || !localStorage.getItem("user-role") ? false : true; ;
    }

    logout(): void {
        this.setToken(null, null)
        localStorage.clear()
    }

    register(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/registration', user);
    }

    refreshToken(refToken: String): Observable<{ tokens: any, user: User}> {
        return this.http.post<{ tokens: any, user: User }>('/api/refresh-tokens', { refreshToken: refToken }).pipe(
            tap(
                ({tokens, user}) => {
                    localStorage.setItem('accessToken', tokens[`accessToken`])
                    localStorage.setItem('refreshToken', tokens[`refreshToken`])
                    localStorage.setItem('user-id', user._id)
                    localStorage.setItem('user-role', user.role)
                    localStorage.setItem('user-email', user.email)
                    localStorage.setItem('user-fullName', user.fullName)
                    this.setToken(tokens, user.role)
                })
            );
    }

    getUsers() {
        return this.http.get(`/api/getUsers`)
    }

    checkUser(emailData: any) {
        return this.http.post(`/api/checkUser`, emailData);
    }

    sendEmailChangePassword(data: UserChangePassword) {
        return this.http.post(`/api/sendMailResetPassword`, data);
    }

    userChangePassword(newPassData) {
        return this.http.post(`/api/changeUserPassword`, newPassData);
    }

}
