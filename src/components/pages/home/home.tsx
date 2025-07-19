import { useTheme } from '@emotion/react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import ChatContainer from '../chat/chat-container';

import Ask from './ask';
import LogoContainer from './logo-container';
import RecentlyAsked from './recently-asked/recently-asked';

const Home = () => {
  const { t } = useTranslation('home');

  const theme = useTheme();

  const chatContainerRef = useRef<HTMLDivElement>(null);

  return (
    <ChatContainer ref={chatContainerRef}>
      <div css={{ flexGrow: 1, maxWidth: theme.sizes.layout.chat.maxWidth }}>
        <LogoContainer>{t('title.logo')}</LogoContainer>
        <Ask />
        <RecentlyAsked />
      </div>
    </ChatContainer>
  );
};

export default Home;
