import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';



@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | undefined;
  document: Document = new Document('', '', '', '', []);
  editMode: boolean = false;

  constructor(private documentService: DocumentService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null) {
        this.editMode = false;
        return;
      }
      else {
        this.originalDocument = this.documentService.getDocument(id);
        if (this.originalDocument === undefined || this.originalDocument === null) {
          return;
        }
        else {
          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.originalDocument));
        }
      }
    });  
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newDocument = new Document(this.document.id, value.name, value.description, value.url, value.children);
    if (this.editMode) {
      if (this.originalDocument) {
        this.documentService.updateDocument(this.originalDocument, newDocument);
      }
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }

  onCancel(){
    this.router.navigate(['/documents']);
  }

}
