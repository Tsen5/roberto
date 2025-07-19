import styled from '@emotion/styled';
import { darken } from 'color2k';
import { ComponentProps } from 'react';

import { setHslaColor } from '../../../helpers/setHslaColor';
import { tokens } from '../../../theme/colors';

export type ButtonVariant = 'outlined' | 'soft' | 'solid' | 'plain';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  color?: keyof typeof tokens;
  size?: ButtonSize;
}

const Button = styled('button', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'color',
})<ButtonProps>(
  ({ theme, disabled, variant = 'soft', color = 'info', size = 'medium' }) => ({
    ...(size === 'small' && {
      padding: `0 ${theme.sizes.spacing.getSpacing(1)}px`,
      height: 24,
    }),
    ...(size === 'medium' && {
      padding: `0 ${theme.sizes.spacing.getSpacing(1.5)}px`,
      height: 32,
    }),
    ...(size === 'large' && {
      padding: `0 ${theme.sizes.spacing.getSpacing(2)}px`,
      height: 40,
    }),
    borderRadius: theme.sizes.radius.getRadius(0.75),
    fontSize: 14,
    boxSizing: 'border-box',
    fontWeight: 500,
    outlineWidth: 0,
    outlineStyle: 'solid',
    outlineOffset: 1,
    ...(variant === 'soft' && {
      border: 'none',
      background: setHslaColor({ color: tokens[color], opacity: 0.1 }),
      color: tokens[color],
      '&:hover': {
        background: setHslaColor({ color: tokens[color], opacity: 0.15 }),
      },
      '&:active': {
        background: setHslaColor({ color: tokens[color], opacity: 0.2 }),
      },
      '&:focus-visible': {
        outlineWidth: 2,
        outlineColor: setHslaColor({ color: tokens[color], opacity: 0.15 }),
      },
    }),
    ...(variant === 'plain' && {
      border: 'none',
      background: 'transparent',
      color: tokens[color],
      '&:hover': {
        background: setHslaColor({ color: tokens[color], opacity: 0.1 }),
      },
      '&:active': {
        background: setHslaColor({ color: tokens[color], opacity: 0.15 }),
      },
      '&:focus-visible': {
        outlineWidth: 2,
        outlineColor: setHslaColor({ color: tokens[color], opacity: 0.1 }),
      },
    }),
    ...(variant === 'outlined' && {
      border: `1px solid ${tokens[color]}`,
      background: 'transparent',
      color: tokens[color],
      '&:hover': {
        background: setHslaColor({ color: tokens[color], opacity: 0.1 }),
      },
      '&:active': {
        background: setHslaColor({ color: tokens[color], opacity: 0.15 }),
      },
      '&:focus-visible': {
        background: setHslaColor({ color: tokens[color], opacity: 0.1 }),
      },
    }),
    ...(variant === 'solid' && {
      border: 'none',
      color: setHslaColor({ color: tokens[color], lightness: 1 }),
      background: setHslaColor({ color: tokens[color] }),
      '&:hover': {
        background: darken(tokens[color], 0.04),
      },
      '&:active': {
        background: darken(tokens[color], 0.08),
      },
      '&:focus-visible': {
        outlineWidth: 2,
        outlineColor: darken(tokens[color], 0.04),
      },
    }),
    ...(!disabled && {
      cursor: 'pointer',
    }),
    ...(disabled && {
      filter: 'grayscale(1)',
      cursor: 'not-allowed',
      '&:hover': {},
      '&:active': {},
      '&:focus-visible': {},
    }),
  }),
);

export default Button;
