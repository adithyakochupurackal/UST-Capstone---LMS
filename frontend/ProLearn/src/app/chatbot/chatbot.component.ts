import { Component } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isExpanded: boolean = false;
  message: string = '';
  messages: { text: string, sender: 'user' | 'ai', timestamp: string }[] = [];

  // Initialize Google Generative AI with your API key
  genAi = new GoogleGenerativeAI('AIzaSyC0q3wUKQ1dPH8faNgJTwvfBQU2KlC1Mvw'); // Add your API Key here
  model = this.genAi.getGenerativeModel({ model: 'gemini-1.5-flash' });

  toggleChat() {
    this.isExpanded = !this.isExpanded;
  }

  // Send message to the AI and get a response
  async sendMessage(): Promise<void> {
    if (this.message.trim()) {
      const userMessage = this.message;
      // Add user's message with timestamp
      this.messages.push({ text: userMessage, sender: 'user', timestamp: new Date().toLocaleTimeString() });
      this.message = ''; // Clear the input field 

      // Adjust the message for AI to focus on short replies
      const adjustedMessage = userMessage + " Make the response on context that you are a Learning chatbot and maximum short replies are preferred.";
      await this.getAiResponse(adjustedMessage);
    }
  }

  // Handle Enter key press
  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  // Fetch AI response
  async getAiResponse(userMessage: string): Promise<void> {
    try {
      // Generate content based on user's input
      const result = await this.model.generateContent(userMessage);
      
      // Log the result to examine the structure
      console.log(result);

      // Assuming the structure of the response has a property like 'response.text' that is a function
      const aiResponse = result?.response?.text() || 'No response from AI'; // Call the function to get the text
      
      // Add AI's response with timestamp
      this.messages.push({ text: aiResponse, sender: 'ai', timestamp: new Date().toLocaleTimeString() });
    } catch (error) {
      console.error('Error generating response:', error);
      this.messages.push({ text: 'Sorry, there was an error processing your request.', sender: 'ai', timestamp: new Date().toLocaleTimeString() });
    }
  }

  // Focus and blur handlers for the input field
  onFocus(): void {
    console.log('Input focused');
  }

  onBlur(): void {
    console.log('Input blurred');
  }
}
