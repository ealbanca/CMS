import { Injectable, EventEmitter} from "@angular/core";
import { Subject } from "rxjs";
import{ HttpClient, HttpHeaders } from "@angular/common/http";

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

    constructor(private http: HttpClient) { 
        this.documents = MOCKDOCUMENTS; // Initialize with mock data from file
        this.maxDocumentId = this.getMaxId();
    }

    /*storeDocuments() {
        const documents = JSON.stringify(this.documents);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/documents.json',
            documents,
            { headers: headers }
        ).subscribe(
            () => {
                this.documentListChangedEvent.next(this.documents.slice());
            },
            (error) => {
                console.error('Error storing documents to server:', error);
            }
        );
    }*/

    getDocuments() {
        return this.http.get<Document[]>('http://localhost:3000/documents');
    }

    getDocument(id: string) {
        return this.http.get<Document>(`http://localhost:3000/documents/${id}`);
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

    addDocument(document: Document) {
        if (!document) {
            return;
        }
        document.id = '';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        // add to database
        this.http.post<{ message: string, document: Document }>(
            'http://localhost:3000/documents',
            document,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.documents.push(responseData.document);
                    this.sortAndSend();
                }
            );
    }

    updateDocument(originalDocument: Document, newDocument: Document) {
        if (!originalDocument || !newDocument) {
            return;
        }
        const pos = this.documents.findIndex(d => d.id === originalDocument.id);
        if (pos < 0) {
            return;
        }
        newDocument.id = originalDocument.id;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(
            'http://localhost:3000/documents/' + originalDocument.id,
            newDocument,{ headers: headers })
            .subscribe(
                (response: any) => {
                    this.documents[pos] = newDocument;
                    this.sortAndSend();
                }
            );
    }

    deleteDocument(document: Document) {
        if (!document || document === undefined) {
            return;
        }
        const pos = this.documents.findIndex(d => d.id === document.id);
        if (pos < 0) {
            return;
        }
        this.http.delete(
            'http://localhost:3000/documents/' + document.id
        ).subscribe(
            (response: any) => {
                this.documents.splice(pos, 1);
                this.sortAndSend();
            }
        );
    }
    private sortAndSend() {
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
    }

}
