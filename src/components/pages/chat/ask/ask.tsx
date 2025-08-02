import { Info, SendHorizonal } from 'lucide-react';
import {
  ChangeEvent,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';
import { useTheme } from '@emotion/react';

import { Chat, ChatStatus } from '../../../../../electron/types/chat';
import usePlatform from '../../../../hooks/usePlatform';
import KeyBadge from '../../../layout/titlebar/section-center/key-badge';
import IconButton from '../../../ui/icon-button/icon-button';
import Spinner from '../../../ui/spinner/spinner';
import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';
import useChatsStore from '../../../../stores/chats';
import Flex from '../../../ui/flex/flex';

import AskInput from './ask-input';
import AskInputCard from './ask-input-card';
import AskInputContainer from './ask-input-container';

export interface AskProps {
  ref: RefObject<HTMLDivElement | null>;
  chat: Chat;
}

const Ask = ({ ref, chat }: AskProps) => {
  const { t } = useTranslation('chats');
  const theme = useTheme();

  const isDetailsPanel = useChatsStore((state) => state.isDetailsPanel);
  const setIsDetailsPanel = useChatsStore((state) => state.setIsDetailsPanel);

  const platform = usePlatform();

  const [askInputValue, setAskInputValue] = useState<string>('');
  const [isAskInputFocused, setIsAskInputFocused] = useState<boolean>(false);

  const askInputRef = useRef<HTMLTextAreaElement>(null);

  const isAskInputValueValid = useMemo(
    () => askInputValue.trim().length > 0 && chat.status === ChatStatus.IDLE,
    [askInputValue, chat.status],
  );

  const metaKey = useMemo(() => {
    if (platform === 'darwin') {
      return t('label.cmdPlusLKey');
    }
    return t('label.ctrlPlusLKey');
  }, [platform, t]);

  const handleChangePrompt = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setAskInputValue(event.target.value);
    },
    [],
  );

  const handleAsk = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!isAskInputValueValid) {
        return;
      }
      event.stopPropagation();
      window.ipcRenderer.send('chat:ask', chat.id, askInputValue);
    },
    [chat.id, askInputValue, isAskInputValueValid],
  );

  const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if (askInputRef.current && event.key === 'l' && event.metaKey) {
      askInputRef.current.select();
    }
  }, []);

  const handleAskInputKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && isAskInputValueValid) {
        event.preventDefault();
        setAskInputValue('');
        window.ipcRenderer.send('chat:ask', chat.id, askInputValue);
      }
      if (event.key === 'Escape') {
        askInputRef.current?.blur();
      }
    },
    [askInputValue, isAskInputValueValid, chat.id],
  );

  const handleFocusAskInput = useCallback(() => {
    setIsAskInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsAskInputFocused(false);
  }, []);

  const handleClickInputContainer = useCallback(() => {
    askInputRef.current?.focus();
  }, []);

  const toggleIsDetailsPanelOpen = useCallback(() => {
    setIsDetailsPanel(!isDetailsPanel);
  }, [isDetailsPanel, setIsDetailsPanel]);

  useEffect(() => {
    if (chat.id) {
      askInputRef.current?.focus();
    }
  }, [chat.id]);

  useEventListener('keydown', handleGlobalKeyDown);

  return (
    <AskInputContainer ref={ref}>
      <Flex
        direction="row"
        grow={1}
        gap={2}
        align="flex-end"
        css={{ maxWidth: theme.sizes.layout.chat.maxWidth }}
      >
        <AskInputCard onClick={handleClickInputContainer}>
          <AskInput
            ref={askInputRef}
            value={askInputValue}
            onChange={handleChangePrompt}
            onKeyDown={handleAskInputKeyDown}
            onFocus={handleFocusAskInput}
            onBlur={handleInputBlur}
            placeholder={t('text.askAnything')}
          />
          <KeyBadge css={{ marginRight: 0, marginBottom: 7 }}>
            {isAskInputFocused ? t('label.escapeKey') : metaKey}
          </KeyBadge>
          <IconButton
            color="icon"
            variant="plain"
            onClick={handleAsk}
            disabled={!isAskInputValueValid}
          >
            {chat.status === ChatStatus.RESPONDING ? (
              <Spinner size={22} color="icon" />
            ) : (
              <SendHorizonal
                size={22}
                css={{ opacity: !isAskInputValueValid ? 0.5 : 1 }}
              />
            )}
          </IconButton>
        </AskInputCard>
        <Flex
          align="center"
          height={58}
          justify="center"
          css={{
            aspectRatio: '1 / 1',
            ...getGlassmorphismStyle({
              backgroundOpacity: 0.7,
              boxShadowOpacity: 0,
            }),
            borderRadius: theme.sizes.radius.getRadius(1.5),
            '&:hover': {
              ...getGlassmorphismStyle({
                backgroundOpacity: 0.9,
                boxShadowOpacity: 0,
              }),
            },
          }}
        >
          <IconButton
            color="info"
            variant={isDetailsPanel ? 'soft' : 'plain'}
            onClick={toggleIsDetailsPanelOpen}
          >
            <Info size={22} />
          </IconButton>
        </Flex>
      </Flex>
    </AskInputContainer>
  );
};

export default Ask;
