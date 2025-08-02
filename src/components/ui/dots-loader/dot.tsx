import styled from '@emotion/styled';

import { tokens } from '../../../theme/colors';

import { jumping } from './jumping';

export interface DotProps {
  size: number;
  color: keyof typeof tokens;
}

const Dot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'color',
})<DotProps>(({ theme, size, color }) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  backgroundColor: theme.colors.tokens[color],
  animation: `${jumping(size)} 1.4s infinite ease-in-out`,
}));

export default Dot;
