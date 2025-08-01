import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Chat } from '../../../../../electron/types/chat';
import useChatEmoji from '../../../../hooks/useChatEmoji';
import useChatTitle from '../../../../hooks/useChatTitle';
import EmojiPopover from '../../../ui/emoji-popover/emoji-popover';
import Flex from '../../../ui/flex/flex';
import IconButton from '../../../ui/icon-button/icon-button';
import TitleInput from './title-input';

export interface ChatIdentityProps {
  chat: Chat;
}

const ChatIdentity = ({ chat }: ChatIdentityProps) => {
  const { title, setTitle } = useChatTitle(chat);
  const { emoji, setEmoji } = useChatEmoji(chat);

  const [titleInputValue, setTitleInputValue] = useState<string>('');
  const [isEmojiPopoverOpen, setIsEmojiPopoverOpen] = useState<boolean>(false);

  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEmojiPopover = useCallback(() => {
    setIsEmojiPopoverOpen(!isEmojiPopoverOpen);
  }, [isEmojiPopoverOpen]);

  const handleChangeEmoji = useCallback(
    (newEmoji: string | null) => {
      setEmoji(newEmoji);
      setIsEmojiPopoverOpen(false);
    },
    [setEmoji],
  );

  const handleChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTitleInputValue(event.target.value);
    },
    [],
  );

  const handleBlurTitle = useCallback(() => {
    setTitleInputValue(title);
  }, [title]);

  const handleTitleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setTitle(titleInputValue);
        titleInputRef.current?.blur();
      }
      if (event.key === 'Escape') {
        titleInputRef.current?.blur();
      }
    },
    [setTitle, titleInputValue],
  );

  useEffect(() => {
    setTitleInputValue(title);
  }, [title]);

  return (
    <Flex direction="column" align="center" gap={1}>
      <EmojiPopover
        value={emoji}
        onChange={handleChangeEmoji}
        isOpen={isEmojiPopoverOpen}
        setIsOpen={setIsEmojiPopoverOpen}
        trigger={
          <IconButton
            variant={isEmojiPopoverOpen ? 'soft' : 'plain'}
            css={{ fontSize: 40, height: 56 }}
            onClick={handleOpenEmojiPopover}
          >
            {emoji}
          </IconButton>
        }
      />
      <TitleInput
        ref={titleInputRef}
        value={titleInputValue}
        onChange={handleChangeTitle}
        onBlur={handleBlurTitle}
        onKeyDown={handleTitleInputKeyDown}
      />
    </Flex>
  );
};

export default ChatIdentity;
