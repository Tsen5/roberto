import ChatList from './chat-list/chat-list';
import Container from './container';
import PinnedChatList from './pinned-chat-list/pinned-chat-list';

const Sidebar = () => {
  return (
    <Container>
      <PinnedChatList />
      <ChatList />
    </Container>
  );
};

export default Sidebar;
