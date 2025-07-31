import { PropsWithChildren } from 'react';

import { usePopover, UsePopoverProps } from '../../../hooks/usePopover';
import { PopoverContext } from '../../../contexts/PopoverContext';

export interface PopoverProps extends UsePopoverProps {
  modal?: boolean;
}

const Popover = ({
  children,
  modal = false,
  ...props
}: PropsWithChildren<PopoverProps>) => {
  const popover = usePopover({ modal, ...props });

  return (
    <PopoverContext.Provider value={popover}>
      {children}
    </PopoverContext.Provider>
  );
};

export default Popover;
