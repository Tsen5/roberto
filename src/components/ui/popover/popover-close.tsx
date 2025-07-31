import { ButtonHTMLAttributes, forwardRef } from 'react';
import { usePopoverContext } from '../../../contexts/PopoverContext';

export type PopoverCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(
  (props, ref) => {
    const { setOpen } = usePopoverContext();

    return (
      <button
        type="button"
        ref={ref}
        {...props}
        onClick={(event) => {
          props.onClick?.(event);
          setOpen(false);
        }}
      />
    );
  },
);
