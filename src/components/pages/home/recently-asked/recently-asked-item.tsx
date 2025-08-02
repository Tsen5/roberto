import useChatEmoji from '../../../../hooks/useChatEmoji';

import { Question } from './recently-asked';
import StyledLink from './styled-link';

export interface RecentlyAskedItemProps {
  question: Question;
}

const RecentlyAskedItem = ({ question }: RecentlyAskedItemProps) => {
  const { emoji } = useChatEmoji(question.chat);

  return (
    <StyledLink
      key={question.message.id}
      to="/chats/$chatId"
      params={{ chatId: question.chat.id }}
    >
      <div>{emoji}</div>
      <div>{question.message.content}</div>
    </StyledLink>
  );
};

export default RecentlyAskedItem;
