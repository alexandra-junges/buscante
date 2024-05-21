import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/models/interfaces';

const body = document.querySelector("body");

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {

  constructor() { }

  @Input() book: Book;
  statusModal: boolean = true;
  @Output() changeModal = new EventEmitter()

  closeModal() {
    this.statusModal = false
    this.changeModal.emit(this.statusModal)
    body.style.overflow = "scroll"
  }

  hideScroll(){
    if(this.statusModal == true ) {
      body.style.overflow = "hidden";
    }
  }

  readPreview() {
    window.open( this.book.previewLink, '_blank');
  }

}
