import styled from '@emotion/styled';
import { transparentize } from 'color2k';

const TitleInput = styled('input')(({ theme }) => ({
  fontSize: 20,
  borderRadius: theme.sizes.radius.getRadius(0.5),
  padding: `${theme.sizes.spacing.getSpacing(0.5)}px ${theme.sizes.spacing.getSpacing(1)}px`,
  background: transparentize(theme.colors.palette.darkGrey, 0.9),
  border: 'none',
  outline: 'none',
  '&:hover': {
    background: transparentize(theme.colors.palette.darkGrey, 0.85),
  },
  '&:focus-within': {
    background: transparentize(theme.colors.palette.darkGrey, 0.8),
  },
}));

export default TitleInput;
