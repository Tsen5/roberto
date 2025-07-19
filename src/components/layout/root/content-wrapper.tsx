import styled from '@emotion/styled';

const ContentWrapper = styled('div')(() => ({
  position: 'fixed' as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column' as const,
}));

export default ContentWrapper;
