import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact$: Observable<Contact>;
  id: string;


  constructor( private contactService: ContactService,
    private route : ActivatedRoute,
    private router : Router,
  ) { }

  ngOnInit(){
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.contact$ = this.contactService.getContact(this.id);
      }
    );
  }

onDelete() {
  this.contact$.subscribe(contact => {
    if (contact) {
      this.contactService.deleteContact(contact);
      this.router.navigate(['/contacts']);
    }
  });
}
}