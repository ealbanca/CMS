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

    /*storeMessages() {
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
    }*/

    getMessages() {
        return this.http.get<any>('http://localhost:3000/messages');
    }
    getMessage(id: string) {
        return this.http.get<Message>(`http://localhost:3000/messages/${id}`);
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
        if (!message) {
            return;
        }
        message.id ='';
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.post<{ name: string, message: Message }>(
            'http://localhost:3000/messages',
            message,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.messages.push(responseData.message);
                    this.messageChangedEvent.emit(this.messages.slice());
                }
            );
    }

    updateMessage(originalMessage: Message, newMessage: Message) {
        if (!originalMessage || !newMessage) {
            return;
        }
        const pos = this.messages.findIndex(m => m.id === originalMessage.id);
        if (pos < 0) {
            return;
        }
        newMessage.id = originalMessage.id;
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        this.http.put(
            `http://localhost:3000/messages/${originalMessage.id}`,
            newMessage,
            { headers: headers })
            .subscribe(
                (response: any) => {
                    this.messages[pos] = newMessage;
                    this.messageChangedEvent.emit(this.messages.slice());
                }
            );
    }

    deleteMessage(message: Message) {
        if (!message) {
            return;
        }
        const pos = this.messages.findIndex(m => m.id === message.id);
        if (pos < 0) {
            return;
        }
        this.http.delete(
            `http://localhost:3000/messages/${message.id}`
        ).subscribe(
            (response: any) => {
                this.messages.splice(pos, 1);
                this.messageChangedEvent.emit(this.messages.slice());
            }
        );
    }
}