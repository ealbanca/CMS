import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): Contact[] {
    if (!contacts || !term) {
      return contacts;
    }

    const filtered: Contact[] = [];
    for (let contact of contacts) {
      if (contact.name.toLowerCase().includes(term.toLowerCase())) {
        filtered.push(contact);
      }
    }

    if (filtered.length === 0) {
      return contacts;
    }

    return filtered;
  }

}
