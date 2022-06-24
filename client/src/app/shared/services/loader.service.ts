import { Injectable } from "@angular/core";
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {

    public subjectLoader = new BehaviorSubject(false);
    constructor() { }

    loaderListener(): Observable<any> {
        return this.subjectLoader.asObservable();
    }
}