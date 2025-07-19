import { Chat } from '../../../../electron/types/chat';

export interface ChatHeaderProps {
  chat: Chat;
}

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  return (
    <div
      css={{
        position: 'sticky',
        top: 0,
      }}
    >
      <div>
        <div>{chat.emoji}</div>
        <div>{chat.title}</div>
      </div>
    </div>
  );
};

export default ChatHeader;
