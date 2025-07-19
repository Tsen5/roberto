import { keyframes } from '@emotion/react';

export const jumping = (size: number) =>
  keyframes({
    '0%, 60%, 100%': {
      transform: 'translateY(0px)',
    },
    '30%': {
      transform: `translateY(${-size / 2}px)`,
    },
  });
