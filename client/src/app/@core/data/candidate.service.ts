import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'


export interface Candidate {
    firstName: string,
    LastName: string,
    email: string,
    position: string,
    skills: Array<any>,
    status: Object,
    languages: Array<any>,
    education: Array<any>,
    socialLinks: Array<any>,
    workExperience: Array<any>,
    city: string,
    address: string,
    telephone: string,
    fileName: string,
    photoName: string,
    date: string,
    motivation_letter: string,
    interests_hobby: string,
    dateOfBirth: string,
}

@Injectable({
    providedIn: 'root'
})
export class CandidateService {

    constructor(private http: HttpClient) { }

    getCandidates(_id?: string, statusId?: string, user_id?: string) {
        
        let params = {};
        _id ? params[`_id`] = _id : '';
        statusId ? params[`statusId`] = statusId : '';
        user_id ? params[`user_id`] = user_id : '';

        return this.http.get(`/api/getCandidates`, {
            params,
        });
    }

    setCandidate(vacancy: Candidate) {
        return this.http.post('/api/setCandidate', vacancy);
    }

    updateCandidate(data) {
        return this.http.post('/api/updateCandidate', data);
    }

    deleteCandidate(id) {
        return this.http.delete(`/api/deleteCandidate/${id}`);
    }

    uploadFile(file) {
        return this.http.post('/api/upload', file);
    }

    uploadPhoto(file) {
        return this.http.post('/api/photo', file);
    }

    sendMail(mail) {
        return this.http.post('/api/sendCandidateMail', mail);
    }

}