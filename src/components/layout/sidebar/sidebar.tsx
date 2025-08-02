import { useTheme } from '@emotion/react';
import { useNavigate } from '@tanstack/react-router';
import { MessageCirclePlus } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';

import usePlatform from '../../../hooks/usePlatform';
import Button from '../../ui/button/button';
import KeyBadge from '../titlebar/section-center/key-badge';
import Flex from '../../ui/flex/flex';
import Overline from '../../ui/overline/overline';

import ChatList from './chat-list/chat-list';
import Container from './container';

const Sidebar = () => {
  const { t } = useTranslation('global');
  const navigate = useNavigate();
  const theme = useTheme();

  const platform = usePlatform();

  const metaKey = useMemo(() => {
    if (platform === 'darwin') {
      return t('label.cmdPlusNKey');
    }
    return t('label.ctrlPlusNKey');
  }, [platform, t]);

  const handleCreateNewChat = useCallback(async () => {
    const newChatId = await window.ipcRenderer.invoke('chat:create');

    navigate({
      to: '/chats/$chatId',
      params: { chatId: newChatId },
    });
  }, [navigate]);

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'n' && event.metaKey) {
        handleCreateNewChat();
      }
    },
    [handleCreateNewChat],
  );

  useEventListener('keydown', handleGlobalKeyDown);

  return (
    <Container>
      <Flex direction="column" gap={1}>
        <Overline
          css={{
            padding: `0 ${theme.sizes.spacing.getSpacing(1)}px`,
            color: theme.colors.tokens.icon,
            fontSize: 14,
          }}
        >
          {t('label.chats')}
        </Overline>
        <ChatList />
        <Button
          css={{
            width: '100%',
            textAlign: 'left',
            padding: `0 ${theme.sizes.spacing.getSpacing(1)}px`,
          }}
          variant="plain"
          color="icon"
          onClick={handleCreateNewChat}
        >
          <Flex align="center" gap={1}>
            <MessageCirclePlus size={18} />
            <span>{t('label.newChat')}</span>
            <KeyBadge
              css={{ marginLeft: 'auto', fontSize: 11, marginRight: 0 }}
            >
              {metaKey}
            </KeyBadge>
          </Flex>
        </Button>
      </Flex>
    </Container>
  );
};

export default Sidebar;
