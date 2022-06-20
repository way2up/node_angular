// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core'
// import { Vacancy } from '../interfaces/IVacancy';

// @Injectable({
//     providedIn: 'root'
// })
// export class CandidateService {

//     constructor(private http: HttpClient) { }

//     getVacancies() {
//         return this.http.get(`/api/getVacancies`);
//     }

//     setVacancy(vacancy: Vacancy) {
//         return this.http.post('/api/setVacancy', vacancy);
//     }

//     uploadFile(file) {
//         return this.http.post('/api/upload', file);
//     }

// }