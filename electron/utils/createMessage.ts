import { v4 as uuidv4 } from 'uuid';

import { AuthorType, Message } from '../types/chat';

export const createMessage = ({
  id = uuidv4(),
  authorType = AuthorType.USER,
  content = '',
  createdAt = new Date(),
  updatedAt = new Date(),
}: Partial<Message> = {}): Message => ({
  id,
  authorType,
  content,
  createdAt,
  updatedAt,
});
