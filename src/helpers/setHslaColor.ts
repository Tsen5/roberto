import { hsla, parseToHsla } from 'color2k';

export const setHslaColor = ({
  color,
  saturation,
  lightness,
  opacity,
}: {
  color: string;
  saturation?: number;
  lightness?: number;
  opacity?: number;
}) => {
  const hslaColor = parseToHsla(color);
  return hsla(
    hslaColor[0],
    saturation ?? hslaColor[1],
    lightness ?? hslaColor[2],
    opacity ?? hslaColor[3],
  );
};
