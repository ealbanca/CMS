import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

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


    constructor() {
        this.contacts = MOCKCONTACTS; // Initialize with mock data from file
        this.maxContactId = this.getMaxId();
    }

    getContacts(): Contact[] {
        return this.contacts.slice(); // Return a copy of the contacts array
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
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
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
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
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
        const contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
    }
}