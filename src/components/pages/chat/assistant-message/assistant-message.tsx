import { memo } from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import 'highlight.js/styles/github-dark-dimmed.css';

import { Message } from '../../../../../electron/types/chat';

import CustomPreComponent from './custom-pre-component';
import CustomAnchorComponent from './custom-anchor-component';

export interface AssistantMessageProps {
  message: Message;
}

const AssistantMessage = ({ message }: AssistantMessageProps) => (
  <div>
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { detect: true }]]}
      components={{
        pre: CustomPreComponent,
        a: CustomAnchorComponent,
      }}
    >
      {message.content}
    </Markdown>
  </div>
);

export default memo(AssistantMessage);
