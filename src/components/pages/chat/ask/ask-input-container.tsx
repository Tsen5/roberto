import styled from '@emotion/styled';

const AskInputContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  width: `calc(100% - ${theme.sizes.spacing.getSpacing(4)}px)`,
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: theme.sizes.spacing.getSpacing(2),
  paddingLeft: theme.sizes.spacing.getSpacing(2),
  paddingRight: theme.sizes.spacing.getSpacing(2),
}));

export default AskInputContainer;
