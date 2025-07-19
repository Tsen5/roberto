import { transparentize } from 'color2k';
import { CSSProperties } from 'react';

import { palette } from '../theme/colors';

export const DEFAULT_BLUR = 5;
export const DEFAULT_BACKGROUND_OPACITY = 0.2;
export const DEFAULT_BORDER_OPACITY = 0.3;
export const DEFAULT_BOX_SHADOW_OPACITY = 0.1;
export const DEFAULT_BORDER_WIDTH = 1;

export interface GlassmorphismStyleProps {
  color: string;
  blur: number;
  backgroundOpacity: number;
  borderOpacity: number;
  boxShadowOpacity: number;
  borderWidth: number;
}

export const getGlassmorphismStyle = ({
  color = palette.white,
  blur = DEFAULT_BLUR,
  backgroundOpacity = DEFAULT_BACKGROUND_OPACITY,
  borderOpacity = DEFAULT_BORDER_OPACITY,
  boxShadowOpacity = DEFAULT_BOX_SHADOW_OPACITY,
  borderWidth = DEFAULT_BORDER_WIDTH,
}: Partial<GlassmorphismStyleProps> = {}): CSSProperties => ({
  background: transparentize(color, 1 - backgroundOpacity),
  boxShadow: `0 4px 30px rgba(0, 0, 0, ${boxShadowOpacity})`,
  backdropFilter: `blur(${blur}px)`,
  WebkitBackdropFilter: `blur(${blur}px)`,
  border: `${borderWidth}px solid ${transparentize(color, 1 - borderOpacity)}`,
});
