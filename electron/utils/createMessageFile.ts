import { v4 as uuidv4 } from 'uuid';

import { MessageFile } from '../types/chat';

export const createMessageFile = ({
  id = uuidv4(),
  path = '',
}: Partial<MessageFile> = {}): MessageFile => ({
  id,
  path,
});
