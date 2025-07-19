import styled from '@emotion/styled';

import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';

const AskInputCard = styled('div')(({ theme }) => ({
  ...getGlassmorphismStyle({ backgroundOpacity: 0.7, boxShadowOpacity: 0 }),
  flexGrow: 1,
  cursor: 'text',
  padding: theme.sizes.spacing.getSpacing(1.5),
  borderRadius: theme.sizes.radius.getRadius(1.5),
  display: 'flex',
  maxWidth: `calc(${theme.sizes.layout.chat.maxWidth}px - ${theme.sizes.spacing.getSpacing(3)}px)`,
  alignItems: 'flex-start',
  gap: theme.sizes.radius.getRadius(1),
  transition: 'all 0.125s linear',
  '&:hover': {
    ...getGlassmorphismStyle({ backgroundOpacity: 0.9, boxShadowOpacity: 0 }),
  },
  '&:focus-within': {
    ...getGlassmorphismStyle({ backgroundOpacity: 0.9, boxShadowOpacity: 0.1 }),
  },
}));

export default AskInputCard;
