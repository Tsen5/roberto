import styled from '@emotion/styled';

const AskInput = styled('textarea')(() => ({
  all: 'unset' as const,
  flexGrow: 1,
  resize: 'none' as const,
  fieldSizing: 'content',
  fontSize: 18,
  lineHeight: '21px',
  marginBottom: 5,
  maxHeight: 200,
}));

export default AskInput;
