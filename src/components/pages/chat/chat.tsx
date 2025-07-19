import useChat from '../../../hooks/useChat';
import { Route } from '../../../routes/chats/$chatId.lazy';

import LoadedChat from './loaded-chat';

const Chat = () => {
  const { chatId } = Route.useParams();

  const chat = useChat(chatId);

  return <>{chat && <LoadedChat chat={chat} />}</>;
};

export default Chat;
