import { useTheme } from '@emotion/react';
import { useMatch, useNavigate } from '@tanstack/react-router';
import { House, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useEventListener } from 'usehooks-ts';

import { useIsSideBarOpen } from '../../../hooks/useIsSideBarOpen';
import usePlatform from '../../../hooks/usePlatform';
import Flex from '../../ui/flex/flex';
import IconButton from '../../ui/icon-button/icon-button';

const SectionLeft = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const platform = usePlatform();

  const isHome = !!useMatch({ from: '/', shouldThrow: false });

  const [isSidebarOpen, setIsSidebarOpen] = useIsSideBarOpen();

  const containerPaddingLeft = useMemo(() => {
    if (platform === 'darwin') {
      return 63;
    }
    return 0;
  }, [platform, theme]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(!isSidebarOpen);
  }, [isSidebarOpen, setIsSidebarOpen]);

  const goToHome = useCallback(() => {
    navigate({ to: '/' });
  }, [navigate]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.metaKey && event.key === 's') {
        toggleSidebar();
      }
    },
    [setIsSidebarOpen, toggleSidebar],
  );

  useEventListener('keydown', handleKeyDown);

  return (
    <>
      <div
        css={{ flexBasis: 'calc(100% / 3)', paddingLeft: containerPaddingLeft }}
      >
        <Flex
          align="center"
          gap={1}
          width="fit-content"
          height="100%"
          css={{ appRegion: 'no-drag' }}
        >
          <IconButton color="icon" variant="plain" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <PanelLeftClose size={20} />
            ) : (
              <PanelLeftOpen size={20} />
            )}
          </IconButton>
          <IconButton
            color="icon"
            variant={isHome ? 'soft' : 'plain'}
            onClick={goToHome}
          >
            <House size={20} />
          </IconButton>
        </Flex>
      </div>
    </>
  );
};

export default SectionLeft;
