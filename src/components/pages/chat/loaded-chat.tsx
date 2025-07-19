import {
  Fragment,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useEventListener,
  useIntersectionObserver,
  useResizeObserver,
} from 'usehooks-ts';

import { useTheme } from '@emotion/react';

import { AuthorType, Chat, ChatStatus } from '../../../../electron/types/chat';

import Ask from './ask/ask';
import AssistantMessage from './assistant-message/assistant-message';
import ChatContainer from './chat-container';
import MessagesContainer from './messages-container';
import ScrollToBottomButton from './scroll-to-bottom-button';
import UserMessage from './user-message';

export interface LoadedChatProps {
  chat: Chat;
}

const LoadedChat = ({ chat }: LoadedChatProps) => {
  const theme = useTheme();

  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const respondingScrollDebounceRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const { height: inputContainerHeight = 0 } = useResizeObserver({
    ref: inputContainerRef as RefObject<HTMLElement>,
    box: 'border-box',
  });

  const { ref, isIntersecting: isEndIntersecting } = useIntersectionObserver();

  const handleScrollChatContainer = useCallback(() => {
    setIsScrolling(true);
    if (respondingScrollDebounceRef.current) {
      clearTimeout(respondingScrollDebounceRef.current);
    }
    respondingScrollDebounceRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 250);
  }, []);

  const handleScrollToBottom = useCallback(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current?.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  useEventListener(
    'scroll',
    handleScrollChatContainer,
    chatContainerRef as RefObject<HTMLDivElement>,
  );

  useEffect(() => {
    if (
      chat.status === ChatStatus.RESPONDING &&
      isEndIntersecting &&
      !isScrolling
    ) {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [chat.status, chat.messages, isEndIntersecting, isScrolling]);

  useEffect(() => {
    if (chat.id) {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current?.scrollHeight,
        behavior: 'instant',
      });
    }
  }, [chat.id]);

  return (
    <ChatContainer ref={chatContainerRef}>
      <div css={{ flexGrow: 1, maxWidth: theme.sizes.layout.chat.maxWidth }}>
        <MessagesContainer inputContainerHeight={inputContainerHeight}>
          {chat.messages.map((message) => (
            <Fragment key={message.id}>
              {message.authorType === AuthorType.USER ? (
                <UserMessage>{message.content}</UserMessage>
              ) : (
                <AssistantMessage message={message} />
              )}
            </Fragment>
          ))}
          <div ref={ref} css={{ height: 50 }} />
        </MessagesContainer>
      </div>
      {!isEndIntersecting && (
        <ScrollToBottomButton
          inputContainerHeight={inputContainerHeight}
          onClick={handleScrollToBottom}
        />
      )}
      <Ask ref={inputContainerRef} chat={chat} />
    </ChatContainer>
  );
};

export default LoadedChat;
