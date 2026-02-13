import { Component, ElementRef, inject, signal, Signal, ViewChild, viewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { ChatService } from '../chat.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-simple-chat',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass],
  templateUrl: './simple-chat.component.html',
  styleUrls: ['./simple-chat.component.scss']
})
export class SimpleChatComponent {

  @ViewChild('chatHistory')
  private chatHistory!: ElementRef;

  private chatService = inject(ChatService);

  userInput = '';
  isLoading = false;

  local = false;

  messages = signal([
    { text: 'Hello! How can I assist you today?', isBot: true }
  ]);

  sendMessage() {
    const input = document.getElementById('messageInput') as HTMLInputElement;
    this.trimUserMessage();
    if (this.userInput !== '' && !this.isLoading) {
      this.updateMessages(this.userInput);
      this.isLoading = true;

      if (this.local) {
        this.simulateResponse();
      } else {
        this.sendChatMessage();
      }
    }
  };

  private sendChatMessage(): void {
    this.chatService.sendChatMessage(this.userInput)
    .pipe(
      catchError(() => {
        this.updateMessages('Sorry, there was an error processing your request. Please try again later.', true);
        this.isLoading = false;
        return throwError(() => new Error('Error sending chat message'));
      })
    )
    .subscribe(response => {
      this.updateMessages(response.message, true);
      this.isLoading = false;
      this.userInput = '';
    });
  }

  private updateMessages(text: string, isBot= false): void {
    this.messages.update(messages => [...messages, { text, isBot }]);
    this.scrollToBottom();
  }

  private trimUserMessage(): void {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse(): void {
    setTimeout(() => {
      const response = 'This is a simulated response from AI.';
      this.updateMessages(response, true);
      this.isLoading = false;
      this.userInput = '';
    }, 2000);
  }

  private scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (error) {}
  }
}
