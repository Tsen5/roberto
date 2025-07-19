import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Chat, Message } from '../../../../../electron/types/chat';
import useChats from '../../../../hooks/useChats';
import Flex from '../../../ui/flex/flex';
import Overline from '../../../ui/overline/overline';
import StyledLink from './styled-link';

export interface Question {
  chat: Omit<Chat, 'messages'>;
  message: Message;
}

const RecentlyAsked = () => {
  const { t } = useTranslation('home');

  const theme = useTheme();

  const chats = useChats();

  const firstQuestions = useMemo(
    () =>
      chats.reduce<Question[]>((result, chat) => {
        if (chat.messages[0]) {
          const { messages, ...chatWithoutMessages } = chat;

          result.push({
            chat: chatWithoutMessages,
            message: chat.messages[0],
          });
        }
        return result;
      }, []),
    [chats],
  );

  const sortedFirstQuestions = useMemo(
    () =>
      [...firstQuestions].sort(
        (questionA, questionB) =>
          questionB.message.createdAt.getTime() -
          questionA.message.createdAt.getTime(),
      ),
    [firstQuestions],
  );

  return (
    <>
      {sortedFirstQuestions.length > 0 && (
        <Flex
          direction="column"
          gap={0.5}
          css={{ marginTop: theme.sizes.spacing.getSpacing(5) }}
        >
          <Overline
            css={{
              fontSize: 13,
              color: theme.colors.tokens.icon,
              padding: `0 ${theme.sizes.spacing.getSpacing(1.5)}px`,
            }}
          >
            {t('label.recentlyAsked')}
          </Overline>
          <Flex direction="column">
            {sortedFirstQuestions.slice(0, 5).map((question) => (
              <StyledLink
                key={question.message.id}
                to="/chats/$chatId"
                params={{ chatId: question.chat.id }}
              >
                <div>{question.chat.emoji}</div>
                <div>{question.message.content}</div>
              </StyledLink>
            ))}
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default RecentlyAsked;
