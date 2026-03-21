import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  private subscription: Subscription;
  term: string = '';

  constructor(private contactService: ContactService) {
  }
  ngOnInit() {
    this.subscription = this.contactService.getContacts().subscribe((response: any) => {
      // If backend returns { contacts: [...] }
      this.contacts = response.contacts ? response.contacts : response;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  search(value: string) {
    this.term = value;
  }
}
