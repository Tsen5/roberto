import styled from '@emotion/styled';
import { transparentize } from 'color2k';
import { EmojiPicker } from 'frimousse';

const EmojiPickerEmpty = styled(EmojiPicker.Empty)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 1,
  height: '100%',
  fontSize: 14,
  padding: theme.sizes.spacing.getSpacing(1),
  color: transparentize(theme.colors.tokens.icon, 0.5),
}));

export default EmojiPickerEmpty;
