import { EventEmitter, Injectable } from '@angular/core';
import{ Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})

export class MessageService {
    messageChangedEvent = new EventEmitter<Message[]>();
    private messages: Message[] = [];

    constructor(private http: HttpClient) {
        this.messages = MOCKMESSAGES; // Initialize with mock data from file
    }

    storeMessages() {
        const messages = JSON.stringify(this.messages);
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.put(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/messages.json',
            messages,
            { headers: headers }
        ).subscribe(() => {
            this.messageChangedEvent.next(this.messages.slice());
        }
        , (error) => {
            console.error('Error storing messages to server:', error);
        }
        );
    }

    getMessages(){
        return this.http.get<Message[]>(
            'https://cms-project-fca75-default-rtdb.firebaseio.com/messages.json').subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                    this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
                    this.messageChangedEvent.emit(this.messages.slice());
                },
                (error) => {
                    console.error('Error fetching messages from server:', error);
                }
            );        
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
        this.storeMessages();
    }
}