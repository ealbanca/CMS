import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'First Document', 'Fisrt sample document.', 'http://example.com/first.pdf',),
    new Document(2, 'Second Document', 'Second sample document.', 'http://example.com/second.pdf',),
    new Document(3, 'Third Document', 'Third sample document.', 'http://example.com/third.pdf',),
    new Document(4, 'Fourth Document', 'Fourth sample document.', 'http://example.com/fourth.pdf',),
    new Document(5, 'Fifth Document', 'Fifth sample document.', 'http://example.com/fifth.pdf',)
];

  constructor() {
  }
  ngOnInit(){

  }
  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
