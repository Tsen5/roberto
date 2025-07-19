import styled from '@emotion/styled';

const TitleInput = styled('input')(() => ({
  all: 'unset' as const,
  width: '100%',
  height: 21,
  cursor: 'text',
}));

export default TitleInput;
