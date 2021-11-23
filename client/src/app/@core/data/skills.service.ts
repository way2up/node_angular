import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class SkillService {

    constructor(private http: HttpClient) { }

    getSkills() {
        return this.http.get(`/api/getSkills`);
    }

    setSkill(id, body) {
        return this.http.put(`/api/setSkill/${id}`, body);
    }

    createSkill(body) {
        return this.http.post('/api/createSkill', body);
    }

    deleteSkill(id) {
        return this.http.delete(`/api/delSkill/${id}`);
    }

}