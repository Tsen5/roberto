import { Global } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={{
      body: {
        fontFamily: 'Roboto Flex, sans-serif',
        fontWeight: 400,
      },
    }}
  />
);

export default GlobalStyles;
