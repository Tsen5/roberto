import styled from '@emotion/styled';

import { getGlassmorphismStyle } from '../../../helpers/getGlassmorphismStyle';

const UserMessage = styled('div')(({ theme }) => ({
  alignSelf: 'flex-end',
  maxWidth: '70%',
  padding: theme.sizes.spacing.getSpacing(1.5),
  borderRadius: theme.sizes.radius.getRadius(1.5),
  wordBreak: 'break-all',
  ...getGlassmorphismStyle({ boxShadowOpacity: 0 }),
}));

export default UserMessage;
