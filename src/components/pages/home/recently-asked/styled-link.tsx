import styled from '@emotion/styled';
import { Link } from '@tanstack/react-router';

import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  fontSize: 18,
  color: theme.colors.tokens.info,
  textDecoration: 'none',
  alignItems: 'center',
  gap: theme.sizes.spacing.getSpacing(1),
  padding: `${theme.sizes.spacing.getSpacing(0.5)}px ${theme.sizes.spacing.getSpacing(1.5)}px`,
  borderRadius: theme.sizes.radius.getRadius(0.5),
  cursor: 'pointer',
  '&:hover': {
    ...getGlassmorphismStyle({ boxShadowOpacity: 0, borderWidth: 0 }),
  },
  '&:active': {
    ...getGlassmorphismStyle({
      boxShadowOpacity: 0,
      borderWidth: 0,
      backgroundOpacity: 0.5,
    }),
  },
})) as typeof Link;

export default StyledLink;
