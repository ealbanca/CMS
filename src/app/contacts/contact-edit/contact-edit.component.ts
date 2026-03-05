import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {
  contact : Contact = new Contact('', '', '', '', '',[]);

onSubmit() {}

onCancel() {}

}
