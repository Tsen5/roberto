import { Emoji, EmojiPicker, Locale } from 'frimousse';
import { MouseEvent, ReactNode, RefObject, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnClickOutside } from 'usehooks-ts';

import Popover from '../popover/popover';
import PopoverContent from '../popover/popover-content';
import PopoverTrigger from '../popover/popover-trigger';

import CategoryHeader from './category-header';
import EmojiButton from './emoji-button';
import EmojiPickerEmpty from './emoji-picker-empty';
import EmojiPickerList from './emoji-picker-list';
import EmojiPickerRoot from './emoji-picker-root';
import EmojiPickerSearch from './emoji-picker-search';

export interface EmojiPopover {
  value: string | null;
  onChange: (newValue: string | null) => void;
  isOpen: boolean;
  setIsOpen: (newIsOpen: boolean) => void;
  trigger: ReactNode;
}

const EmojiPopover = ({
  value,
  onChange,
  isOpen,
  setIsOpen,
  trigger,
}: EmojiPopover) => {
  const {
    t,
    i18n: { language },
  } = useTranslation('chats');

  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutsidePopover = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleTriggerMouseDown = useCallback((event: MouseEvent) => {
    event.stopPropagation();
  }, []);

  const handleSelectEmoji = useCallback(
    (emoji: Emoji) => () => {
      onChange(emoji.emoji);
    },
    [onChange],
  );

  useOnClickOutside(
    popoverRef as RefObject<HTMLElement>,
    handleClickOutsidePopover,
  );

  return (
    <Popover open={isOpen}>
      <PopoverTrigger onMouseDown={handleTriggerMouseDown} asChild>
        {trigger}
      </PopoverTrigger>
      <PopoverContent ref={popoverRef}>
        <EmojiPickerRoot locale={language as Locale}>
          <EmojiPickerSearch />
          <EmojiPicker.Viewport>
            <EmojiPicker.Loading>
              {t('label.loadingEmojis')}
            </EmojiPicker.Loading>
            <EmojiPickerEmpty>{t('label.noEmojiFound')}</EmojiPickerEmpty>
            <EmojiPickerList
              components={{
                CategoryHeader,
                Emoji: (props) => (
                  <EmojiButton
                    {...props}
                    isSelected={
                      !!value && value.trim() === props.emoji.emoji.trim()
                    }
                    onClick={handleSelectEmoji}
                  />
                ),
              }}
            />
          </EmojiPicker.Viewport>
        </EmojiPickerRoot>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPopover;
