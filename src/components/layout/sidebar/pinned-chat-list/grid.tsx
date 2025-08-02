import styled from '@emotion/styled';

const Grid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.sizes.spacing.getSpacing(1),
}));

export default Grid;
