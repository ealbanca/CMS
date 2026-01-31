import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import  { Document } from '../document.model';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Document;
  @Output() documentSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit(){
  }

  onSelectedDocument() {
    this.documentSelected.emit();
  }
}
