import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  private subscription: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.subscription = this.messageService.getMessages().subscribe((response: any) => {
      // If backend returns { messages: [...] }
      this.messages = response.messages ? response.messages : response;
    });
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
