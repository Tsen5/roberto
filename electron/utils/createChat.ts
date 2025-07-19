import { v4 as uuidv4 } from 'uuid';

import { Chat, ChatStatus } from '../types/chat';

export const createChat = ({
  id = uuidv4(),
  messages = [],
  createdAt = new Date(),
  updatedAt = new Date(),
  title = null,
  status = ChatStatus.CREATING,
  emoji = null,
}: Partial<Chat> = {}): Chat => ({
  id,
  messages,
  createdAt,
  updatedAt,
  title,
  status,
  emoji,
});
