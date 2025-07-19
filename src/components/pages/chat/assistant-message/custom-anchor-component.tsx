import styled from '@emotion/styled';

const CustomAnchorComponent = styled('a')(({ theme }) => ({
  color: theme.colors.tokens.info,
}));

export default CustomAnchorComponent;
