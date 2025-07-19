import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import Body from '../body/body';
import Page from '../page/page';
import Sidebar from '../sidebar/sidebar';
import Titlebar from '../titlebar/titlebar';

import Background from './background';
import ContentWrapper from './content-wrapper';
import GlobalStyles from './global-styles';

const Root = () => (
  <Background>
    <GlobalStyles />
    <ContentWrapper>
      <Titlebar />
      <Page>
        <Sidebar />
        <Body>
          <Outlet />
        </Body>
      </Page>
      <TanStackRouterDevtools />
    </ContentWrapper>
  </Background>
);

export default Root;
