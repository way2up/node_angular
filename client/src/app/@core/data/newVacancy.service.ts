import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface vacancy {
    _id?: string,
    metaTitle?: string,
    metaDescription?: string,
    url: string,
    ogType?: string,
    ogTitle?: string,
    ogDescription?: string,
    ogImage?: string,
    vacancyTitle?: string,
    startDate?: string,
    endDate?: string,
    smallImage?: string,
    bigImage?: string,
    shortDescription?: string,
    longDescription?: string,
    show?: boolean,
    startD?: any,
    endD?: any
    
}

@Injectable({
    providedIn: 'root'
})

export class NewVacancyService {

    constructor(private http: HttpClient) { }

    getVacancies() {
        return this.http.get(`/api/getVacancies`);
    }

    createVacancy(vacancy: vacancy) {
        return this.http.post('/api/createVacancy', vacancy);
    }

    updateVacancy(data) {
        return this.http.post('/api/updateVacancy', data);
    }

}