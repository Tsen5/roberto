import { PropsWithChildren } from 'react';

import Button, { ButtonProps } from '../button/button';

export type IconButtonProps = ButtonProps;

const IconButton = ({ ...props }: PropsWithChildren<IconButtonProps>) => (
  <Button
    css={{
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'unset',
    }}
    {...props}
  />
);

export default IconButton;
