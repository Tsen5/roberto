import { useNavigate } from '@tanstack/react-router';
import { SendHorizonal } from 'lucide-react';
import {
  ChangeEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useEventListener } from 'usehooks-ts';

import usePlatform from '../../../hooks/usePlatform';
import KeyBadge from '../../layout/titlebar/section-center/key-badge';
import IconButton from '../../ui/icon-button/icon-button';
import AskInput from '../chat/ask/ask-input';
import AskInputCard from '../chat/ask/ask-input-card';

const Ask = () => {
  const { t } = useTranslation('chats');
  const navigate = useNavigate();

  const platform = usePlatform();

  const [askInputValue, setAskInputValue] = useState<string>('');
  const [isAskInputFocused, setIsAskInputFocused] = useState<boolean>(false);

  const askInputRef = useRef<HTMLTextAreaElement>(null);

  const isAskInputValueValid = useMemo(
    () => askInputValue.trim().length > 0,
    [askInputValue],
  );

  const metaKey = useMemo(() => {
    if (platform === 'darwin') {
      return t('label.cmdPlusLKey');
    }
    return t('label.ctrlPlusLKey');
  }, [platform, t]);

  const createChatAndAsk = useCallback(async () => {
    const newChatId = await window.ipcRenderer.invoke('chat:create');

    window.ipcRenderer.send('chat:ask', newChatId, askInputValue);

    navigate({
      to: '/chats/$chatId',
      params: { chatId: newChatId },
    });
  }, [askInputValue, navigate]);

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
      createChatAndAsk();
    },
    [askInputValue, isAskInputValueValid, createChatAndAsk],
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
        createChatAndAsk();
      }
      if (event.key === 'Escape') {
        askInputRef.current?.blur();
      }
    },
    [askInputValue, isAskInputValueValid, createChatAndAsk],
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

  useEffect(() => {
    askInputRef.current?.focus();
  }, []);

  useEventListener('keydown', handleGlobalKeyDown);

  return (
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
        <SendHorizonal
          size={22}
          css={{ opacity: !isAskInputValueValid ? 0.5 : 1 }}
        />
      </IconButton>
    </AskInputCard>
  );
};

export default Ask;
