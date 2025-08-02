import { useTheme } from '@emotion/react';
import { useCallback } from 'react';
import { useEventListener } from 'usehooks-ts';

import { Chat } from '../../../../../electron/types/chat';
import useChatsStore from '../../../../stores/chats';

import ChatIdentity from './chat-identity';
import ChatInformations from './chat-informations';
import ChatActions from './chat-actions/chat-actions';

export interface LoadedChatDetailsProps {
  chat: Chat;
}

const LoadedChatDetails = ({ chat }: LoadedChatDetailsProps) => {
  const theme = useTheme();

  const isDetailsPanelOpen = useChatsStore((state) => state.isDetailsPanel);
  const setIsDetailsPanel = useChatsStore((state) => state.setIsDetailsPanel);

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 'i') {
        setIsDetailsPanel(!isDetailsPanelOpen);
      }
    },
    [isDetailsPanelOpen, setIsDetailsPanel],
  );

  useEventListener('keydown', handleGlobalKeyDown);

  return (
    <div
      css={{
        padding: `${theme.sizes.spacing.getSpacing(2)}px ${theme.sizes.spacing.getSpacing(2)}px`,
      }}
    >
      <ChatIdentity chat={chat} />
      <ChatInformations chat={chat} />
      <ChatActions chat={chat} />
    </div>
  );
};

export default LoadedChatDetails;
