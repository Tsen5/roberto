import { Theme } from '@emotion/react';
import { transparentize } from 'color2k';

import { getGlassmorphismStyle } from '../../../../../helpers/getGlassmorphismStyle';

import { CHAT_LINK_ICON_CLASS } from './chat-link';

export const getLinkStyle = (isCurrent: boolean, theme: Theme) => ({
  padding: theme.sizes.spacing.getSpacing(1),
  borderRadius: theme.sizes.radius.getRadius(1),
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: theme.sizes.spacing.getSpacing(1),
  transition: 'transform 0.125s ease-in-out',
  color: theme.colors.tokens.text,
  textDecoration: 'none',
  fontSize: 16,
  lineHeight: '21px',
  [`& .${CHAT_LINK_ICON_CLASS}`]: {
    opacity: 0,
  },
  ...(isCurrent && {
    ...getGlassmorphismStyle({
      borderOpacity: 0,
      backgroundOpacity: 0.5,
      color: theme.colors.palette.white,
      borderWidth: 0,
    }),
    boxShadow: `0 1px 3px rgba(0, 0, 0, ${0.2})`,
    [`& .${CHAT_LINK_ICON_CLASS}`]: {
      opacity: 1,
    },
  }),
  ...(!isCurrent && {
    background: 'transparent',
    '&:hover': {
      background: transparentize(theme.colors.palette.darkGrey, 0.9),
      [`& .${CHAT_LINK_ICON_CLASS}`]: {
        opacity: 1,
      },
    },
  }),
  '&:active': {
    transform: 'scale(0.99)',
  },
});
