import styled from '@emotion/styled';
import { darken, transparentize } from 'color2k';

const LogoContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: 120,
  marginTop: theme.sizes.spacing.getSpacing(13),
  fontFamily: 'Borel',
  color: theme.colors.tokens.info,
  background: `linear-gradient(135deg,
    ${darken(theme.colors.background.pink, 0.1)} 0%,
    ${darken(theme.colors.background.yellow, 0.1)} 50%,
    ${darken(theme.colors.background.cyan, 0.1)} 100%)`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: `2px 2px 0px ${transparentize(theme.colors.palette.white, 0.9)}`,
}));

export default LogoContainer;
