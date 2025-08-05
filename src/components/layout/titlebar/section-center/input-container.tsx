import styled from '@emotion/styled';
import { transparentize } from 'color2k';

const InputContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'text',
  padding: `${theme.sizes.spacing.getSpacing(1)} 0`,
  gap: theme.sizes.spacing.getSpacing(1.5),
  flexGrow: 1,
  appRegion: 'no-drag',
  alignItems: 'center',
  borderRadius: theme.sizes.radius.getRadius(1),
  background: transparentize(theme.colors.palette.darkGrey, 0.9),
  margin: theme.sizes.spacing.getSpacing(1),
  maxWidth: theme.sizes.layout.chat.maxWidth,
  '&:hover': {
    background: transparentize(theme.colors.palette.darkGrey, 0.85),
  },
  '&:focus-within': {
    background: transparentize(theme.colors.palette.darkGrey, 0.8),
    boxShadow: `0 1px 3px rgba(0, 0, 0, ${0.2})`,
  },
}));

export default InputContainer;
