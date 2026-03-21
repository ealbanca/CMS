import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root',
})

export class ContactService {
    contactListChangedEvent = new Subject<Contact[]>();
    contactSelectedEvent = new EventEmitter<Contact>();
    contacts: Contact[] = [];
    contactChangedEvent = new EventEmitter<Contact[]>();
    maxContactId: number;


    constructor(private http: HttpClient) {
        this.contacts = MOCKCONTACTS; // Initialize with mock data from file
        this.maxContactId = this.getMaxId();
    }

    /*storeContacts() {
        const contacts = JSON.stringify(this.contacts);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/contacts.json',
            contacts,
            { headers: headers }
        ).subscribe(() => {
            this.contactListChangedEvent.next(this.contacts.slice());
        },
            (error) => {
                console.error('Error storing contacts to server:', error);
            }
        );
    }*/

    getContacts() {
        return this.http.get<any>('http://localhost:3000/contacts');
    }
    getContact(id: string) {
        return this.http.get<Contact>(`http://localhost:3000/contacts/${id}`);
    }

    getMaxId(): number {
        let maxId = 0;
        this.contacts.forEach(contact => {
            const currentId = parseInt(contact.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        return maxId;
    }

    addContact(newContact: Contact) {
        if (!newContact || newContact === undefined) {
            return;
        }
        newContact.id = '';
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post<{ message: string, contact: Contact }>(
            'http://localhost:3000/contacts',
            newContact,
            { headers: headers }
         ).subscribe(
            (responseData) => {
                this.contacts.push(responseData.contact);
                this.contactListChangedEvent.next(this.contacts.slice());
            }
        );
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact || originalContact === undefined || newContact === undefined) {
            return;
        }
        const pos = this.contacts.findIndex(c => c.id === originalContact.id);
        if (pos < 0) {
            return;
        }
        newContact.id = originalContact.id;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put(
            `http://localhost:3000/contacts/${originalContact.id}`,
            newContact,
            { headers: headers }
         ).subscribe(
            (response: any) => {
                this.contacts[pos] = newContact;
                this.contactListChangedEvent.next(this.contacts.slice());
            }
         );
    }

    deleteContact(contact: Contact) {
        if (!contact || contact === undefined) {
            return;
        }
        const pos = this.contacts.findIndex(c => c.id === contact.id);
        if (pos < 0) {
            return;
        }
        this.http.delete(
            `http://localhost:3000/contacts/${contact.id}`
         ).subscribe(
            (response: any) => {
                this.contacts.splice(pos, 1);
                this.contactListChangedEvent.next(this.contacts.slice());
            }
         );
    }
}