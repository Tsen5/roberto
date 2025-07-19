import { tokens } from '../../../theme/colors';

import Dot from './dot';

export interface DotsLoaderProps {
  size?: number;
  color?: keyof typeof tokens;
}

const DotsLoader = ({ size = 6, color = 'text' }: DotsLoaderProps) => (
  <div css={{ display: 'flex', alignItems: 'center', gap: size / 4 }}>
    {[...Array(3)].map((_, index) => (
      <Dot
        key={index}
        size={size}
        color={color}
        css={{ animationDelay: `${index * 0.18}s` }}
      />
    ))}
  </div>
);

export default DotsLoader;
