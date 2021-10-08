import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { User } from '../interfaces/IAuth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    register() { }
    login(user: User): Observable<{ token: string }> {
        return this.http.post<{ token: string }>('/api/login', user);
    }

    logout() {
        localStorage.clear();
    }

}
