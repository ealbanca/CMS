import { EventEmitter } from '@angular/core';
import{ Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    private messages: Message[] = [];

    constructor(){
        this.messages = MOCKMESSAGES; // Initialize with mock data from file
    }

    getMessages(): Message[] {
        return this.messages.slice(); // Return a copy of the messages array
    }
    getMessage(id: string): Message | undefined {
        return this.messages.find(message => message.id === id);
    }

    getMaxId(): number {
        let maxId = 0;
        this.messages.forEach(message => {
            const currentId = parseInt(message.id);
            if (currentId > maxId) {
                maxId = currentId;
            }
        });
        return maxId;
    }


    addMessage(message: Message){
        this.messages.push(message);
        this.messageChangedEvent.emit(this.messages.slice());
    }
}