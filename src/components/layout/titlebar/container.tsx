import styled from '@emotion/styled';

const Container = styled('div')(({ theme }) => ({
  height: theme.sizes.layout.titlebar.height,
  appRegion: 'drag',
  display: 'flex',
  padding: `0 ${theme.sizes.layout.page.padding}px`,
  gap: theme.sizes.spacing.getSpacing(1),
  flexDirection: 'row',
  flexShrink: 0,
}));

export default Container;
