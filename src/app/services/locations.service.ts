import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, finalize, map, Observable, take } from "rxjs";
import { Location } from "../models/location.model";

@Injectable({
    providedIn: 'root'
})

export class LocationsService {
    baseUrl = 'https://rickandmortyapi.com/api';
    loading = new BehaviorSubject(false);
    next = new BehaviorSubject(false);
    previous = new BehaviorSubject(false);

    constructor(private http: HttpClient) {
    }

    getLocations(name: string, dimension: string, page: number): Observable<Location[]> {
        this.loading.next(true);

        return this.http.get<any>(`${this.baseUrl}/location/?name=${name}&dimension=${dimension}&page=${page}`).pipe(
            map((response) => {
                this.next.next(!!response.info.next)
                this.previous.next(!!response.info.prev)
                return response.results
            }
            ),
            take(1),
            finalize(() => this.loading.next(false))
        );
    }

    getLoadingState(): Observable<boolean> {
        return this.loading.asObservable();
    }

    getNextState(): Observable<boolean> {
        return this.next.asObservable();
    }

    getPreviousState(): Observable<boolean> {
        return this.previous.asObservable();
    }
}