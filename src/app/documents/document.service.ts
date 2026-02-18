import { Injectable, EventEmitter} from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documents: Document[] = [];
    documentChangedEvent = new EventEmitter<Document[]>();

    constructor() {
        this.documents = MOCKDOCUMENTS; // Initialize with mock data from file
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
}