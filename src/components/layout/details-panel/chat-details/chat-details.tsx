import useChat from '../../../../hooks/useChat';
import LoadedChatDetails from './loaded-chat-details';

export interface ChatDetailsProps {
  chatId: string;
}

const ChatDetails = ({ chatId }: ChatDetailsProps) => {
  const chat = useChat(chatId);

  return <>{chat && <LoadedChatDetails chat={chat} />}</>;
};

export default ChatDetails;
