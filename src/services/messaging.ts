import { MessagingProtocol } from './interfaces/messaging-protocol';

export class Messaging implements MessagingProtocol {
  sendMessaging(msg: string): void {
    console.log(msg);
  }
}
