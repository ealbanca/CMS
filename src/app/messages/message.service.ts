import{ Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

export class MessageService {
    messages: Message[] = [];

    constructor(){
        this.messages = MOCKMESSAGES; // Initialize with mock data from file
    }

    getMessages(): Message[] {
        return this.messages.slice(); // Return a copy of the messages array
    }
    getMessage(id: string): Message | undefined {
        return this.messages.find(message => message.id === id);
    }
}