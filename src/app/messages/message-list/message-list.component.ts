import { Component, OnInit, OnDestroy } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  private subscription: Subscription;
  private changeSub: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Subscribe to changes in the message list
    this.changeSub = this.messageService.messageChangedEvent.subscribe((messages: Message[]) => {
      this.messages = messages;
    });
    // Fetch the initial list from the backend
    this.subscription = this.messageService.getMessages().subscribe((response: any) => {
      this.messages = response.messages ? response.messages : response;
      this.messageService['messages'] = this.messages;
      this.messageService.messageChangedEvent.emit(this.messages.slice());
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.changeSub) {
      this.changeSub.unsubscribe();
    }
  }
}
