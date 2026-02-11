import { Component, signal, Signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-simple-chat',
  standalone: true,
  imports: [MatCardModule, MatToolbarModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, NgClass],
  templateUrl: './simple-chat.component.html',
  styleUrls: ['./simple-chat.component.scss']
})
export class SimpleChatComponent {

  userInput = '';

  messages = signal([
    { text: 'Hello! How can I assist you today?', isBot: true }
  ]);

  sendMessage() {
    const input = document.getElementById('messageInput') as HTMLInputElement;
    this.trimUserMessage();
    if (this.userInput !== '') {
      this.updateMessages(this.userInput);
      this.userInput = '';
      this.simulateResponse();
    }
  };

  private updateMessages(text: string, isBot= false): void {
    this.messages.update(messages => [...messages, { text, isBot }]);
  }

  private trimUserMessage(): void {
    this.userInput = this.userInput.trim();
  }

  private simulateResponse(): void {
    setTimeout(() => {
      const response = 'This is a simulated response from AI.';
      this.updateMessages(response, true);
    }, 2000);
  }
}
