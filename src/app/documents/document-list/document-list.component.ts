import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;
  private changeSub: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    // Subscribe to changes in the document list
    this.changeSub = this.documentService.documentListChangedEvent.subscribe((documents: Document[]) => {
      this.documents = documents;
    });
    // Fetch the initial list from the backend
    this.subscription = this.documentService.getDocuments().subscribe((response: any) => {
      this.documents = response.documents ? response.documents : response;
      this.documentService.documents = this.documents;
      this.documentService.sortAndSend();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }
}
