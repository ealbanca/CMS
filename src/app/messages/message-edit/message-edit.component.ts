import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent implements OnInit {
  @ViewChild ('subject') subjectInputRef: ElementRef;
  @ViewChild ('msgText') msgTextInputRef: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = 'Hared Albancando';


  constructor() { }

  ngOnInit(){
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    const newMessage = new Message(10,subject, msgText, this.currentSender);
    this.addMessageEvent.emit(newMessage);
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
