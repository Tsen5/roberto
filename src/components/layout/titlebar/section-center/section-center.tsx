import { useTheme } from '@emotion/react';
import { useNavigate } from '@tanstack/react-router';
import { MessageCircleQuestionMark } from 'lucide-react';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';

import usePlatform from '../../../../hooks/usePlatform';

import Flex from '../../../ui/flex/flex';
import AskInput from './ask-input';
import InputContainer from './input-container';
import KeyBadge from './key-badge';

const SectionCenter = () => {
  const { t } = useTranslation('global');
  const theme = useTheme();
  const navigate = useNavigate();

  const platform = usePlatform();

  const [isAskInputFocused, setIsAskInputFocused] = useState<boolean>(false);
  const [askInputValue, setAskInputValue] = useState<string>('');

  const askInputRef = useRef<HTMLInputElement>(null);

  const metaKey = useMemo(() => {
    if (platform === 'darwin') {
      return t('label.cmdPlusKKey');
    }
    return t('label.ctrlPlusKKey');
  }, [platform, t]);

  const handleClickInputContainer = useCallback(() => {
    askInputRef.current?.focus();
  }, []);

  const handleGlobalKeyDown = useCallback((event: KeyboardEvent) => {
    if (askInputRef.current && event.key === 'k' && event.metaKey) {
      askInputRef.current.select();
    }
  }, []);

  const handleAskInputKeyDown = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        askInputRef.current?.blur();
        const newChatId = await window.ipcRenderer.invoke('chat:create');

        navigate({
          to: '/chats/$chatId',
          params: { chatId: newChatId },
        });

        window.ipcRenderer.send('chat:ask', newChatId, askInputValue);
        setAskInputValue('');
      }
      if (event.key === 'Escape') {
        askInputRef.current?.blur();
      }
    },
    [askInputValue],
  );

  const handleChangeAskInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setAskInputValue(event.target.value);
    },
    [],
  );

  const handleFocusAskInput = useCallback(() => {
    setIsAskInputFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsAskInputFocused(false);
  }, []);

  useEventListener('keydown', handleGlobalKeyDown);

  return (
    <Flex
      basis="calc(100% / 3)"
      css={{ padding: theme.sizes.spacing.getSpacing(1) }}
    >
      <InputContainer onClick={handleClickInputContainer}>
        <MessageCircleQuestionMark
          size={20}
          color={theme.colors.palette.darkGrey}
          css={{ marginLeft: theme.sizes.spacing.getSpacing(1) }}
        />
        <AskInput
          ref={askInputRef}
          placeholder={t('text.askAnything')}
          onFocus={handleFocusAskInput}
          onBlur={handleInputBlur}
          onKeyDown={handleAskInputKeyDown}
          onChange={handleChangeAskInput}
          value={askInputValue}
        />
        <KeyBadge>
          {isAskInputFocused ? t('label.escapeKey') : metaKey}
        </KeyBadge>
      </InputContainer>
    </Flex>
  );
};

export default SectionCenter;
