import { createLazyFileRoute } from '@tanstack/react-router';

import Chat from '../../components/pages/chat/chat';

export const Route = createLazyFileRoute('/chats/$chatId')({
  component: Chat,
});
