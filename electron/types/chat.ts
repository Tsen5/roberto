export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ChatStatus {
  CREATING = 'creating',
  IDLE = 'idle',
  LISTENING = 'listening',
  RESPONDING = 'responding',
  ERROR = 'error',
}

export interface Chat extends Entity {
  title: string | null;
  emoji: string | null;
  messages: Message[];
  status: ChatStatus;
}

export enum AuthorType {
  USER = 'user',
  ASSISTANT = 'assistant',
}

export interface Message extends Entity {
  authorType: AuthorType;
  content: string;
}
