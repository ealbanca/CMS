import { Injectable, EventEmitter} from "@angular/core";
import { Document } from "./document.model";
import { MOCKDOCUMENTS } from "./MOCKDOCUMENTS";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
    documentSelectedEvent = new EventEmitter<Document>();
    documents: Document[] = [];

    constructor() {
        this.documents = MOCKDOCUMENTS; // Initialize with mock data from file
    }

    getDocuments(): Document[] {
        return this.documents.slice(); // Return a copy of the documents array
    }

    getDocument(id: string): Document | undefined {
        return this.documents.find(document => document.id === id);
    }
}