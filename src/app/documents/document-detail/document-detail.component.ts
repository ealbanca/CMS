import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';


@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent implements OnInit {
document: Document | undefined;
id: string;
nativeWindow: any;

  constructor( private documentService: DocumentService,
    private windowRefService: WindRefService,
    private route : ActivatedRoute,
    private router : Router,
  ) { 
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
      }
    );

  }

onView(){
    if(this.document && this.document.url){
      this.nativeWindow.open(this.document.url);
  }
}

onDelete() {
  if (this.document) {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }
}
}
