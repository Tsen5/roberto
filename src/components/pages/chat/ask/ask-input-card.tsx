import styled from '@emotion/styled';

import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';

const AskInputCard = styled('div')(({ theme }) => ({
  ...getGlassmorphismStyle({ backgroundOpacity: 0.7, boxShadowOpacity: 0 }),
  flexGrow: 1,
  cursor: 'text',
  borderRadius: theme.sizes.radius.getRadius(1.5),
  padding: theme.sizes.spacing.getSpacing(1.5),
  display: 'flex',
  alignItems: 'flex-end',
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
