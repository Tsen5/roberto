import { useId } from '@floating-ui/react';
import { forwardRef, HTMLProps, useLayoutEffect } from 'react';
import { usePopoverContext } from '../../../contexts/PopoverContext';

export type PopoverHeadingProps = HTMLProps<HTMLHeadingElement>;

export const PopoverHeading = forwardRef<
  HTMLHeadingElement,
  PopoverHeadingProps
>((props, ref) => {
  const { setLabelId } = usePopoverContext();

  const id = useId();

  useLayoutEffect(() => {
    setLabelId(id);
    return () => setLabelId(undefined);
  }, [id, setLabelId]);

  return (
    <h2 {...props} ref={ref} id={id}>
      {props.children}
    </h2>
  );
});
