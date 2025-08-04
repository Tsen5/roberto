import styled from '@emotion/styled';
import { transparentize } from 'color2k';

const Container = styled('div')(({ theme }) => ({
  fontSize: 12,
  color: transparentize(theme.colors.tokens.text, 0.3),
  border: `1px solid ${transparentize(theme.colors.tokens.text, 0.9)}`,
  borderRadius: theme.sizes.radius.getRadius(0.5),
  paddingTop: theme.sizes.spacing.getSpacing(0.25),
  paddingBottom: theme.sizes.spacing.getSpacing(0.25),
  paddingLeft: theme.sizes.spacing.getSpacing(0.75),
  display: 'flex',
  alignItems: 'center',
  gap: theme.sizes.spacing.getSpacing(0.5),
}));

export default Container;
