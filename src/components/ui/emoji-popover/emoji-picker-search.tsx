import styled from '@emotion/styled';
import { transparentize } from 'color2k';
import { EmojiPicker } from 'frimousse';

const EmojiPickerSearch = styled(EmojiPicker.Search)(({ theme }) => ({
  border: 'unset',
  outline: 'unset',
  fontSize: 16,
  padding: `${theme.sizes.spacing.getSpacing(0.5)}px ${theme.sizes.spacing.getSpacing(1)}px`,
  borderRadius: theme.sizes.radius.getRadius(0.5),
  marginTop: theme.sizes.spacing.getSpacing(1),
  marginBottom: theme.sizes.spacing.getSpacing(1),
  background: transparentize(theme.colors.palette.darkGrey, 0.9),
  '&:hover': {
    background: transparentize(theme.colors.palette.darkGrey, 0.85),
  },
  '&:focus-within': {
    background: transparentize(theme.colors.palette.darkGrey, 0.8),
  },
}));

export default EmojiPickerSearch;
