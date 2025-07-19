import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { tokens } from '../../../theme/colors';

import { rotation } from './rotation';

export interface SpinnerProps extends ComponentProps<'span'> {
  size?: number;
  thickness?: number;
  color?: keyof typeof tokens;
}

const Spinner = styled('span', {
  shouldForwardProp: (prop) =>
    prop !== 'size' && prop !== 'thickness' && prop !== 'color',
})<SpinnerProps>(({ size = 18, thickness = 2, color = 'text' }) => ({
  width: size,
  height: size,
  border: `${thickness}px solid ${tokens[color]}`,
  borderBottomColor: 'transparent',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  animation: `${rotation} 1s linear infinite`,
}));

export default Spinner;
