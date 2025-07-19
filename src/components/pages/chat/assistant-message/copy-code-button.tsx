import styled from '@emotion/styled';

const CopyCodeButton = styled('button')(({ theme }) => ({
  all: 'unset',
  color: theme.colors.palette.white,
  cursor: 'pointer',
  fontSize: 12,
  padding: `${theme.sizes.spacing.getSpacing(0.5)}px ${theme.sizes.spacing.getSpacing(1)}px`,
  opacity: 0.75,
  '&:hover': {
    opacity: 1,
  },
}));

export default CopyCodeButton;
