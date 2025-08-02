import { useTheme } from '@emotion/react';

import { Chat } from '../../../../../electron/types/chat';

import ChatIdentity from './chat-identity';
import ChatInformations from './chat-informations';

export interface LoadedChatDetailsProps {
  chat: Chat;
}

const LoadedChatDetails = ({ chat }: LoadedChatDetailsProps) => {
  const theme = useTheme();

  return (
    <div
      css={{
        padding: `${theme.sizes.spacing.getSpacing(2)}px ${theme.sizes.spacing.getSpacing(1)}px`,
      }}
    >
      <ChatIdentity chat={chat} />
      <ChatInformations chat={chat} />
    </div>
  );
};

export default LoadedChatDetails;
