import { transparentize } from 'color2k';
import styled from '@emotion/styled';

const KeyBadge = styled.div(({ theme }) => ({
  background: transparentize(theme.colors.palette.darkGrey, 0.9),
  padding: `${theme.sizes.spacing.getSpacing(0.25)}px ${theme.sizes.spacing.getSpacing(0.5)}px`,
  borderRadius: theme.sizes.radius.getRadius(0.5),
  fontSize: 12,
  color: theme.colors.palette.darkGrey,
  fontWeight: 500,
  marginRight: theme.sizes.spacing.getSpacing(1),
}));

export default KeyBadge;
