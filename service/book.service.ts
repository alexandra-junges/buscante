import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { BooksResult, Item } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly API = 'https://www.googleapis.com/books/v1/volumes'

  constructor(private http: HttpClient) { }

  search(typedValue: string): Observable<BooksResult> {
    const params = new HttpParams().append('q', typedValue)
    return this.http.get<BooksResult>(this.API, { params })
  }
}
