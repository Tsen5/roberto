import styled from '@emotion/styled';
import { transparentize } from 'color2k';

const ChatContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  paddingLeft: theme.sizes.spacing.getSpacing(2),
  paddingRight: theme.sizes.spacing.getSpacing(2),
  position: 'relative',
  overflow: 'auto',
  height: '100%',
  scrollbarGutter: 'stable both-edges',
  scrollbarColor: `${transparentize(theme.colors.palette.darkGrey, 0.5)} transparent`,
  scrollbarWidth: 'thin',
}));

export default ChatContainer;
