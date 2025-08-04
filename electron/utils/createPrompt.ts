import { Prompt } from '../types/chat';

export const createPrompt = ({ files = [] }: Partial<Prompt> = {}): Prompt => ({
  files,
});
