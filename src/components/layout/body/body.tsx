import styled from '@emotion/styled';

import { getGlassmorphismStyle } from '../../../helpers/getGlassmorphismStyle';

const Body = styled('div')(({ theme }) => ({
  ...getGlassmorphismStyle({
    borderOpacity: 0,
    borderWidth: 0,
    backgroundOpacity: 0.3,
  }),
  flexGrow: 1,
  borderRadius: theme.sizes.radius.getRadius(1),
  overflow: 'auto',
  boxShadow: `0 0 ${theme.sizes.layout.page.padding}px rgba(0, 0, 0, 0.1)`,
}));

export default Body;
