import { useId } from '@floating-ui/react';
import { forwardRef, HTMLProps, useLayoutEffect } from 'react';

import { usePopoverContext } from '../../../contexts/PopoverContext';

export type PopoverDescriptionProps = HTMLProps<HTMLParagraphElement>;

export const PopoverDescription = forwardRef<
  HTMLParagraphElement,
  PopoverDescriptionProps
>((props, ref) => {
  const { setDescriptionId } = usePopoverContext();
  const id = useId();

  useLayoutEffect(() => {
    setDescriptionId(id);
    return () => setDescriptionId(undefined);
  }, [id, setDescriptionId]);

  return <p {...props} ref={ref} id={id} />;
});
