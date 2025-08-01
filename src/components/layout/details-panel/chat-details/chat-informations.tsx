import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { Chat } from '../../../../../electron/types/chat';
import Flex from '../../../ui/flex/flex';

export interface ChatInformationsProps {
  chat: Chat;
}

const ChatInformations = ({ chat }: ChatInformationsProps) => {
  const theme = useTheme();

  const {
    t,
    i18n: { language },
  } = useTranslation('chats');

  return (
    <Flex
      gap={1}
      direction="column"
      css={{ marginTop: theme.sizes.spacing.getSpacing(5) }}
    >
      <Flex gap={0.5}>
        <span css={{ fontWeight: 500 }}>{t('label.createdAt')}</span>
        <span>{chat.createdAt.toLocaleString(language)}</span>
      </Flex>
      <Flex gap={0.5}>
        <span css={{ fontWeight: 500 }}>{t('label.updatedAt')}</span>
        <span>{chat.updatedAt.toLocaleString(language)}</span>
      </Flex>
      <Flex gap={0.5}>
        <span css={{ fontWeight: 500 }}>{t('label.messagesCount')}</span>
        <span>{chat.messages.length}</span>
      </Flex>
    </Flex>
  );
};

export default ChatInformations;
