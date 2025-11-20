import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from "../types";

// We use the specific mapping for Flash Lite as requested for low latency
const MODEL_NAME = 'gemini-flash-lite-latest';

class GeminiService {
  private ai: GoogleGenAI;
  private chatSession: Chat | null = null;

  constructor() {
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      console.error("API Key not found in environment variables");
    }
    this.ai = new GoogleGenAI({ apiKey: apiKey || '' });
  }

  public initializeChat(history: Message[] = []) {
    // Convert internal message format to API history format if needed in future
    // For now, we start a fresh session or could map history
    this.chatSession = this.ai.chats.create({
      model: MODEL_NAME,
      config: {
        temperature: 0.7,
        maxOutputTokens: 8192, // Allow long responses if needed, but Flash Lite is fast
      }
    });
  }

  public async *streamMessage(content: string): AsyncGenerator<string, void, unknown> {
    if (!this.chatSession) {
      this.initializeChat();
    }

    if (!this.chatSession) {
      throw new Error("Failed to initialize chat session");
    }

    try {
      const result = await this.chatSession.sendMessageStream({
        message: content,
      });

      for await (const chunk of result) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    } catch (error) {
      console.error("Error streaming message:", error);
      throw error;
    }
  }
}

export const geminiService = new GeminiService();
