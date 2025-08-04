import styled from '@emotion/styled';
import { ComponentProps, CSSProperties } from 'react';

export interface FlexProps extends ComponentProps<'div'> {
  direction?: CSSProperties['flexDirection'];
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  gap?: number;
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  basis?: CSSProperties['flexBasis'];
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  wrap?: CSSProperties['flexWrap'];
}

const Flex = styled('div', {
  shouldForwardProp: (prop) =>
    prop !== 'direction' &&
    prop !== 'align' &&
    prop !== 'justify' &&
    prop !== 'gap' &&
    prop !== 'grow' &&
    prop !== 'shrink' &&
    prop !== 'basis' &&
    prop !== 'width' &&
    prop !== 'height' &&
    prop !== 'wrap',
})<FlexProps>(
  ({
    theme,
    direction = 'row',
    gap = 0,
    align = 'stretch',
    justify = 'flex-start',
    grow = undefined,
    shrink = undefined,
    basis = undefined,
    width = undefined,
    height = undefined,
    wrap = undefined,
  }) => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    gap: theme.sizes.spacing.getSpacing(gap),
    flexGrow: grow,
    flexShrink: shrink,
    flexBasis: basis,
    width: width,
    height: height,
    flexWrap: wrap,
  }),
);

export default Flex;
