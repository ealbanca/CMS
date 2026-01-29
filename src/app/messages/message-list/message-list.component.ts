import { Component, OnInit } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [
    new Message(2, 'Test 2', 'This is my first message', 'R. Kent Jackson'),
    new Message(3, 'Test 3', 'Angular makes building apps fun!', 'Rex Barzee'),
    new Message(4, 'Test 4', 'TypeScript adds types to JavaScript.', 'Alice Johnson'),
    new Message(5, 'Test 5', 'Learn how components communicate in Angular.', 'Bob Smith')
  ];

  constructor() {
  }
  ngOnInit(){
  }

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
