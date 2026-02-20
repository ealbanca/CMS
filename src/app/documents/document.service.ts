import { Injectable, EventEmitter} from "@angular/core";
import { Subject } from "rxjs";

import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
    documentListChangedEvent = new Subject<Document[]>();
    documentSelectedEvent = new EventEmitter<Document>();
    documents: Document[] = [];
    documentChangedEvent = new EventEmitter<Document[]>();
    maxDocumentId: number;

    constructor() {
        this.documents = MOCKDOCUMENTS; // Initialize with mock data from file
        this.maxDocumentId = this.getMaxId();
    }

    getDocuments(): Document[] {
        return this.documents.slice(); // Return a copy of the documents array
    }

    getDocument(id: string): Document | undefined {
        return this.documents.find(document => document.id === id);
    }

    deleteDocument(document: Document){
        if(!document){
            return;
        }
        const pos = this.documents.indexOf(document);
        if(pos < 0){
            return;
        }
        this.documents.splice(pos, 1);
        this.documentChangedEvent.emit(this.documents.slice());
    }

    getMaxId(): number {
        let maxId = 0;
        this.documents.forEach(document => {
            const currentId = parseInt(document.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        return maxId;
        }

    addDocument(newDocument: Document) {
        if (!newDocument || newDocument === undefined) {
            return;
        }
        this.maxDocumentId++;
        newDocument.id = this.maxDocumentId.toString();
        this.documents.push(newDocument);
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument || originalDocument === undefined || newDocument === undefined) {
            return;
        }
        const pos = this.documents.indexOf(originalDocument);
        if (pos < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        this.documents[pos] = newDocument;
        const documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
    }
}
