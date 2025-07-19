import { useTheme } from '@emotion/react';
import { PropsWithChildren, useMemo } from 'react';

import { useIsSideBarOpen } from '../../../hooks/useIsSideBarOpen';

const Container = ({ children }: PropsWithChildren) => {
  const theme = useTheme();

  const [isSidebarOpen] = useIsSideBarOpen();

  const marginLeft = useMemo(() => {
    if (!isSidebarOpen) {
      return -(
        theme.sizes.layout.sidebar.width + theme.sizes.layout.page.padding
      );
    }
    return 0;
  }, [
    isSidebarOpen,
    theme.sizes.layout.sidebar.width,
    theme.sizes.layout.page.padding,
  ]);

  return (
    <div
      css={{
        width: theme.sizes.layout.sidebar.width,
        flexShrink: 0,
        marginLeft,
        transition: 'margin-left 0.125s ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
