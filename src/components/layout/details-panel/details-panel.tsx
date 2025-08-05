import { useMatch } from '@tanstack/react-router';
import { useMemo } from 'react';

import ChatDetails from './chat-details/chat-details';
import Container from './container';

const DetailsPanel = () => {
  const match = useMatch({ from: '/chats/$chatId', shouldThrow: false });

  const chatId = useMemo(() => match?.params.chatId, [match]);
  const canAccessDetailsPanel = useMemo(() => !!chatId, [chatId]);

  return (
    <Container canAccessDetailsPanel={canAccessDetailsPanel}>
      {chatId && <ChatDetails chatId={chatId} />}
    </Container>
  );
};

export default DetailsPanel;
