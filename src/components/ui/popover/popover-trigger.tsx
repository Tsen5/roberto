import { useMergeRefs } from '@floating-ui/react';
import {
  cloneElement,
  forwardRef,
  HTMLProps,
  isValidElement,
  PropsWithChildren,
} from 'react';

import { usePopoverContext } from '../../../contexts/PopoverContext';

export interface PopoverTriggerProps extends HTMLProps<HTMLElement> {
  asChild?: boolean;
}

const PopoverTrigger = forwardRef<
  HTMLElement,
  PropsWithChildren<PopoverTriggerProps>
>(({ children, asChild = false, ...props }, propRef) => {
  const context = usePopoverContext();

  const childrenRef = (children as any).ref;

  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        ...(children.props as any),
        'data-state': context.open ? 'open' : 'closed',
      }),
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export default PopoverTrigger;
