import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';

import { Chat } from '../../../../../electron/types/chat';
import Flex from '../../../ui/flex/flex';
import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';

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
    <div
      css={{
        ...getGlassmorphismStyle({ boxShadowOpacity: 0, backgroundOpacity: 0 }),
        borderRadius: theme.sizes.radius.getRadius(0.5),
        padding: theme.sizes.spacing.getSpacing(2),
        fontSize: 14,
        marginTop: theme.sizes.spacing.getSpacing(3),
        marginBottom: theme.sizes.spacing.getSpacing(2),
      }}
    >
      <Flex gap={1} direction="column">
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
    </div>
  );
};

export default ChatInformations;
