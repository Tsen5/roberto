import { useTheme } from '@emotion/react';
import { PropsWithChildren, useMemo } from 'react';

import useChatsStore from '../../../stores/chats';
import { getGlassmorphismStyle } from '../../../helpers/getGlassmorphismStyle';

export interface ContainerProps {
  canAccessDetailsPanel: boolean;
}

const Container = ({
  children,
  canAccessDetailsPanel,
}: PropsWithChildren<ContainerProps>) => {
  const theme = useTheme();

  const isDetailsPanelOpen = useChatsStore((state) => state.isDetailsPanel);

  const marginRight = useMemo(() => {
    if (!isDetailsPanelOpen || !canAccessDetailsPanel) {
      return -(
        theme.sizes.layout.detailsPanel.width + theme.sizes.layout.page.padding
      );
    }
    return 0;
  }, [
    canAccessDetailsPanel,
    isDetailsPanelOpen,
    theme.sizes.layout.detailsPanel.width,
    theme.sizes.layout.page.padding,
  ]);

  return (
    <div
      css={{
        width: theme.sizes.layout.detailsPanel.width,
        flexShrink: 0,
        marginRight,
        transition: 'margin-right 0.125s ease-out',
        ...getGlassmorphismStyle({
          borderOpacity: 0,
          borderWidth: 0,
          backgroundOpacity: 0.3,
        }),
        borderRadius: theme.sizes.radius.getRadius(1),
        boxShadow: `0 0 ${theme.sizes.layout.page.padding}px rgba(0, 0, 0, 0.1)`,
        overflow: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default Container;
