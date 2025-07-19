import styled from '@emotion/styled';

const Page = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  padding: theme.sizes.layout.page.padding,
  paddingTop: 0,
  gap: theme.sizes.layout.page.padding,
  overflow: 'hidden',
}));

export default Page;
