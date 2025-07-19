import { createLazyFileRoute } from '@tanstack/react-router';

import Home from '../components/pages/home/home';

export const Route = createLazyFileRoute('/')({
  component: Home,
});
