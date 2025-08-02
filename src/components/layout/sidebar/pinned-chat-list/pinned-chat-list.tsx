import { useTheme } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';
import { useCallback, useRef, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Pin } from 'lucide-react';

import usePinnedChats from '../../../../hooks/usePinnedChats';
import Flex from '../../../ui/flex/flex';
import Overline from '../../../ui/overline/overline';

import Grid from './grid';
import PinnedChatLink from './pinned-chat-link';

const PinnedChatList = () => {
  const { t } = useTranslation('global');
  const theme = useTheme();
  const navigate = useNavigate();

  const [isMetaPressed, setIsMetaPressed] = useState<boolean>(false);

  const pressingMetaDebounce = useRef<ReturnType<typeof setTimeout>>(null);

  const { pinnedChats } = usePinnedChats();

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Meta') {
        pressingMetaDebounce.current = setTimeout(() => {
          setIsMetaPressed(true);
        }, 500);
      }
      if (event.metaKey) {
        const number = parseInt(event.key, 10);
        if (Number.isInteger(number)) {
          const chat = pinnedChats[number - 1];
          if (chat) {
            navigate({ to: `/chats/${chat.id}` });
          }
        }
      }
    },
    [pinnedChats],
  );

  const handleGlobalKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Meta') {
      if (pressingMetaDebounce.current) {
        clearTimeout(pressingMetaDebounce.current);
      }
      setIsMetaPressed(false);
    }
  }, []);

  useEventListener('keydown', handleGlobalKeyDown);
  useEventListener('keyup', handleGlobalKeyUp);

  return (
    <>
      {pinnedChats.length > 0 && (
        <Flex
          direction="column"
          gap={1}
          css={{ marginBottom: theme.sizes.spacing.getSpacing(3) }}
        >
          <Flex direction="row" align="center">
            <Pin
              size={13}
              color={theme.colors.tokens.icon}
              css={{ transform: 'rotate(30deg)' }}
            />
            <Overline
              css={{
                padding: `0 ${theme.sizes.spacing.getSpacing(1)}px`,
                color: theme.colors.tokens.icon,
                fontSize: 13,
              }}
            >
              {t('label.pinnedChats')}
            </Overline>
          </Flex>
          <Grid>
            {pinnedChats.map((pinnedChat, index) => (
              <PinnedChatLink
                key={pinnedChat.id}
                chat={pinnedChat}
                controlKey={index + 1}
                isMetaPressed={isMetaPressed}
              />
            ))}
          </Grid>
        </Flex>
      )}
    </>
  );
};

export default PinnedChatList;
