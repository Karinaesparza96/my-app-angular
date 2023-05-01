import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { IHero } from './heroes/hero';
import { MessageService } from '../messages/message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl).pipe(
      delay(300),
      tap(() => this.log('fetched heroes')),
      catchError(this.handleError<IHero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<IHero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<IHero>(`getHero id=${id}`))
    );
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(tap((newHero: IHero) => this.log(`added hero ${hero.name} id=${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    );
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  deleteHero(id: number): Observable<IHero>{
    const url = `${this.heroesUrl}/${id}`;
      return this.http.delete<IHero>(url,this.httpOptions).pipe(
        tap(_=> this.log(`delete hero ${id}`)),
        catchError(this.handleError<IHero>('deleteHero'))
      )
  }

  searchHeroes(term: string): Observable<IHero[]>{
    if(!term.trim){
      return of([])
    }
    return this.http
          .get<IHero[]>(`${this.heroesUrl}/?name=${term}`)
          .pipe(
            tap(arr => arr.length ?
                this.log(`found heroes matching "${term}"`) :
                this.log(`no heroes matching "${term}"`),
                catchError(this.handleError<IHero[]>('searchHeroes', []))
              )
            )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
