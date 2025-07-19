import { createLazyFileRoute } from '@tanstack/react-router';

import Chats from '../../components/pages/chats/chats';

export const Route = createLazyFileRoute('/chats/')({
  component: Chats,
});
