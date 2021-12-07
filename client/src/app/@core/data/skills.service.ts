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

    // Positions
    getPositions() {
        return this.http.get(`/api/getPositions`);
    }

    setPosition(id, body) {
        return this.http.put(`/api/setPosition/${id}`, body);
    }

    createPosition(body) {
        return this.http.post('/api/createPosition', body);
    }

    deletePosition(id) {
        return this.http.delete(`/api/delPosition/${id}`);
    }

    // Statuses
    getStatuses(id?: string) {
        return this.http.get(`/api/getStatuses`, {
            params: {
                _id: id,
              },
        });
    }

    setStatus(id, body) {
        return this.http.put(`/api/setStatus/${id}`, body);
    }

    createStatus(body) {
        return this.http.post('/api/createStatus', body);
    }

    deleteStatus(id) {
        return this.http.delete(`/api/delStatus/${id}`);
    }

}