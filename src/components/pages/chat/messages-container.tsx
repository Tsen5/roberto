import styled from '@emotion/styled';

export interface MessagesContainerProps {
  inputContainerHeight: number;
}

const MessagesContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'inputContainerHeight',
})<MessagesContainerProps>(({ theme, inputContainerHeight }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: 1.5,
  gap: theme.sizes.spacing.getSpacing(5),
  paddingTop: theme.sizes.spacing.getSpacing(2),
  paddingBottom: `calc(${inputContainerHeight}px + ${theme.sizes.spacing.getSpacing(2)}px)`,
}));

export default MessagesContainer;
