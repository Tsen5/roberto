import { FilePlus, Plus } from 'lucide-react';
import { useTheme } from '@emotion/react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { getGlassmorphismStyle } from '../../../../helpers/getGlassmorphismStyle';
import Button from '../../../ui/button/button';
import Flex from '../../../ui/flex/flex';
import IconButton from '../../../ui/icon-button/icon-button';
import Popover from '../../../ui/popover/popover';
import PopoverContent from '../../../ui/popover/popover-content';
import PopoverTrigger from '../../../ui/popover/popover-trigger';
import { Chat } from '../../../../../electron/types/chat';

export interface AddFilesButtonProps {
  chat: Chat;
}

const AddFilesButton = ({ chat }: AddFilesButtonProps) => {
  const { t } = useTranslation('chats');
  const theme = useTheme();

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const handleOpenPopover = useCallback(() => {
    setIsPopoverOpen(!isPopoverOpen);
  }, [isPopoverOpen]);

  const handleChangePopoverOpen = useCallback((newIsOpen: boolean) => {
    setIsPopoverOpen(newIsOpen);
  }, []);

  const handleClickAddFiles = useCallback(async () => {
    const filePaths = await window.ipcRenderer.invoke('chat:addFiles', chat.id);
    if (filePaths.length > 0) {
      setIsPopoverOpen(false);
    }
  }, [chat.id]);

  return (
    <Popover
      placement="top-start"
      open={isPopoverOpen}
      onOpenChange={handleChangePopoverOpen}
    >
      <PopoverTrigger asChild>
        <IconButton color="icon" variant="plain" onClick={handleOpenPopover}>
          <Plus
            size={22}
            css={{
              transition: 'transform 0.125s linear',
              transform: isPopoverOpen ? 'rotate(45deg)' : 'none',
            }}
          />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <Flex
          direction="column"
          css={{
            ...getGlassmorphismStyle({
              borderWidth: 0,
              backgroundOpacity: 0.9,
            }),
            marginBottom: theme.sizes.spacing.getSpacing(3),
            marginLeft: -theme.sizes.spacing.getSpacing(1.5),
            padding: theme.sizes.spacing.getSpacing(1),
            borderRadius: theme.sizes.radius.getRadius(1),
          }}
        >
          <Button variant="plain" onClick={handleClickAddFiles}>
            <Flex direction="row" align="center" gap={2}>
              <FilePlus size={16} />
              <span>{t('button.addFiles')}</span>
            </Flex>
          </Button>
        </Flex>
      </PopoverContent>
    </Popover>
  );
};

export default AddFilesButton;
