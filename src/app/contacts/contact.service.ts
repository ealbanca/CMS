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

    storeContacts() {
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
    }

    getContacts(){
        return this.http.get<Contact[]>(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/contacts.json').subscribe(
                (contacts: Contact[]) => {
                    this.contacts = contacts;
                    this.maxContactId = this.getMaxId();
                    this.contacts.sort((a, b) => a.name.localeCompare(b.name));
                    this.contactListChangedEvent.next(this.contacts.slice());
                },
                (error) => {
                    console.error('Error fetching contacts from server:', error);
                }
            );
    }
    getContact(id: string): Contact | undefined {
        return this.contacts.find(contact => contact.id === id);
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
        this.maxContactId++;
        newContact.id = this.maxContactId.toString();
        this.contacts.push(newContact);
        this.storeContacts();
    }

    updateContact(originalContact: Contact, newContact: Contact) {
        if (!originalContact || !newContact || originalContact === undefined || newContact === undefined) {
            return;
        }
        const pos = this.contacts.indexOf(originalContact);
        if (pos < 0) {
            return;
        }
        newContact.id = originalContact.id;
        this.contacts[pos] = newContact;
        this.storeContacts();
    }
    deleteContact(contact: Contact) {
        if (!contact || contact === undefined) {
            return;
        }
        const pos = this.contacts.indexOf(contact);
        if (pos < 0) {
            return;
        }
        this.contacts.splice(pos, 1);
        this.storeContacts();
    }
}