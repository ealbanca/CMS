import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root',
})

export class ContactService {
    contactSelectedEvent = new EventEmitter<Contact>();
    contacts: Contact[] = [];


    constructor() {
        this.contacts = MOCKCONTACTS; // Initialize with mock data from file
    }

    getContacts(): Contact[] {
        return this.contacts.slice(); // Return a copy of the contacts array
    }
    getContact(id: string): Contact | undefined {
        for (let contact of this.contacts) {
            if (contact.id === id) {
                return contact;
            }
        }
        return undefined; // Return undefined if contact not found
    }
}