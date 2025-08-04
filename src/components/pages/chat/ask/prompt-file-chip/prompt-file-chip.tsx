import { X } from 'lucide-react';
import { useCallback, useMemo } from 'react';

import { Chat, MessageFile } from '../../../../../../electron/types/chat';
import IconButton from '../../../../ui/icon-button/icon-button';

import Container from './container';

export interface PromptFileChipProps {
  chat: Chat;
  file: MessageFile;
}

const PromptFileChip = ({ chat, file }: PromptFileChipProps) => {
  const fileName = useMemo(() => file.path.split('/').pop(), [file.path]);

  const handleRemoveFile = useCallback(async () => {
    await window.ipcRenderer.invoke('chat:removeFile', chat.id, file.id);
  }, [chat.id, file.id]);

  return (
    <Container>
      <span>{fileName}</span>
      <IconButton
        color="icon"
        variant="plain"
        css={{ height: 20 }}
        onClick={handleRemoveFile}
      >
        <X size={12} />
      </IconButton>
    </Container>
  );
};

export default PromptFileChip;
