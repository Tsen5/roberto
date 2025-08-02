import { Emoji, EmojiPickerListEmojiProps } from 'frimousse';

import IconButton from '../icon-button/icon-button';

export interface EmojiButtonProps
  extends Omit<EmojiPickerListEmojiProps, 'onClick'> {
  isSelected: boolean;
  onClick: (emoji: Emoji) => () => void;
}

const EmojiButton = ({ emoji, isSelected, onClick }: EmojiButtonProps) => (
  <IconButton
    css={{ fontSize: 18 }}
    onClick={onClick(emoji)}
    variant={isSelected ? 'soft' : 'plain'}
  >
    {emoji.emoji}
  </IconButton>
);

export default EmojiButton;
