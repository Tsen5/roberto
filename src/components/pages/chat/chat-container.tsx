import styled from '@emotion/styled';

const ChatContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: theme.sizes.spacing.getSpacing(2),
  paddingRight: theme.sizes.spacing.getSpacing(2),
  position: 'relative',
  overflow: 'auto',
  height: '100%',
}));

export default ChatContainer;
