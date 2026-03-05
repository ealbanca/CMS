import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact | undefined;
  contact : Contact = new Contact('', '', '', '', '',[]);
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string = '';

constructor(private contactService: ContactService,
            private router: Router,
            private route: ActivatedRoute,
) {}


ngOnInit(){
  this.route.params.subscribe((params: Params) => {
    this.id = params['id'];
    if(this.id === undefined || this.id === null) {
      this.editMode = false;
      return;
    } else {
      this.originalContact = this.contactService.getContact(this.id);
      if(this.originalContact === undefined || this.originalContact === null) {
        return;
      } else {
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));
        if(this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    }
  });
}

onSubmit(form: NgForm) {
  const value = form.value;
  const newContact = new Contact(this.contact.id, value.name, value.email, value.phone, value.imageUrl, this.groupContacts);
  if(this.editMode) {
    if(this.originalContact) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
  } else {
    this.contactService.addContact(newContact);
  }
  this.router.navigate(['/contacts']);
}

onCancel() {
  this.router.navigate(['/contacts']);
}

onRemoveItem(index: number) {

}
}
