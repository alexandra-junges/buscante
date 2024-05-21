import { FormControl } from '@angular/forms';
import { BooksResult, Item } from './../../models/interfaces';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap, throwError, of } from 'rxjs';
import { BookVolumeInfo } from 'src/app/models/bookVolumeInfo';
import { BookService } from 'src/app/service/book.service';

const BREAK = 300;

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent {

  searchField = new FormControl()
  ErrorMessage = ''
  booksResult: BooksResult;
  BooksListComponent: BookVolumeInfo[];

  constructor(private service: BookService) { }

  booksTotal$ = this.searchField.valueChanges
  .pipe(
    debounceTime(BREAK),
    filter((typedValue) => typedValue.length >=3),
    distinctUntilChanged(),
    switchMap((typedValue) => this.service.search(typedValue)),
    map(result => this.booksResult = result),
    catchError(erro => {
      console.log(erro)
      return of()
    })
  )

  booksFinded$ = this.searchField.valueChanges
    .pipe(
      debounceTime(BREAK),
      filter((typedValue) => typedValue.length >=3),
      switchMap((typedValue) => this.service.search(typedValue)),
      map(result => this.booksResult = result),
      map(result => result.items ?? []),
      map((items) => this.BooksListComponent = this.booksResultForBooks(items)),
      catchError(erro => {
        console.log(erro)
        return throwError(() =>
          new Error(this.ErrorMessage = 'Oops, an error occurred, reload the application'))
      })
    )

  booksResultForBooks(items: Item[]): BookVolumeInfo[] {
    return items.map(item => {
      return new BookVolumeInfo(item)
    })
  }
}



