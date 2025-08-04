import { v4 as uuidv4 } from 'uuid';

import { Chat, ChatStatus } from '../types/chat';

import { createPrompt } from './createPrompt';

export const createChat = ({
  id = uuidv4(),
  messages = [],
  createdAt = new Date(),
  updatedAt = new Date(),
  title = null,
  status = ChatStatus.CREATING,
  emoji = null,
  currentPrompt = createPrompt(),
}: Partial<Chat> = {}): Chat => ({
  id,
  messages,
  createdAt,
  updatedAt,
  title,
  status,
  emoji,
  currentPrompt,
});
