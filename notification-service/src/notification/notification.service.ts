import { Injectable } from '@nestjs/common';
import { firebaseMessaging } from '../firebase/firebase-admin';

@Injectable()
export class NotificationService {
  private tokens: string[] = [];

  registerToken(token: string) {
    if (!this.tokens.includes(token)) {
      this.tokens.push(token);
      console.log('Token enregistré :', token);
    }
  }

  async sendToToken(token: string, title: string, body: string) {
    const message = {
      token,
      notification: { title, body },
    };

    try {
      await firebaseMessaging.send(message);
      console.log('Notification envoyée à', token);
    } catch (err) {
      console.error('Erreur d’envoi :', err);
    }
  }

  getAllTokens() {
    return this.tokens;
  }
}
