import { ipcMain } from 'electron';
import { LlamaChatSession } from 'node-llama-cpp';
import { v4 as uuidv4 } from 'uuid';

import { model } from '..';
import {
  deleteChat,
  getChat,
  getChatLlamaCPP,
  getChats,
  setChat,
  setChatLlamaCPP,
  updateChat,
} from '../store/chat';
import { AuthorType, ChatStatus } from '../types/chat';
import { createChat } from '../utils/createChat';
import { createMessage } from '../utils/createMessage';
import i18n from '../../src/localization';

export function registerChatIPC() {
  ipcMain.handle('chat:create', async () => {
    const context = await model.createContext({
      contextSize: { max: 8096 }, // omit this for a longer context size, but increased memory usage
    });
    const session = new LlamaChatSession({
      contextSequence: context.getSequence(),
    });
    const newChatId = uuidv4();
    const newChat = createChat({ id: newChatId });
    setChat(newChatId, newChat);
    setChatLlamaCPP(newChatId, {
      context,
      session,
    });
    updateChat(newChatId, { status: ChatStatus.IDLE });
    return newChatId;
  });

  ipcMain.handle('chat:delete', (event, chatId: string) => {
    deleteChat(chatId);
  });

  ipcMain.handle('chat:read', (event, chatId: string) => {
    return getChat(chatId);
  });

  ipcMain.handle('chats:read', () => {
    return getChats();
  });

  ipcMain.on('chat:ask', async (event, chatId: string, prompt: string) => {
    try {
      updateChat(chatId, { status: ChatStatus.LISTENING });

      const chat = getChat(chatId);

      const isFirstMessage = chat.messages.length === 0;

      const chatLlamaCPP = getChatLlamaCPP(chatId);

      const newUserMessage = createMessage({
        content: prompt,
        authorType: AuthorType.USER,
      });

      updateChat(chatId, {
        messages: [...chat.messages, newUserMessage],
        status: ChatStatus.RESPONDING,
      });

      const assistantMessageId = uuidv4();

      await chatLlamaCPP.session.prompt(prompt, {
        onResponseChunk(chunk) {
          const updatedChat = getChat(chatId);
          const lastMessage =
            updatedChat.messages[updatedChat.messages.length - 1];

          if (lastMessage && lastMessage.id === assistantMessageId) {
            lastMessage.content += chunk.text;
            lastMessage.updatedAt = new Date();
            updateChat(chatId, { messages: updatedChat.messages });
          } else {
            const newAssistantMessage = createMessage({
              id: assistantMessageId,
              authorType: AuthorType.ASSISTANT,
              content: chunk.text,
              createdAt: new Date(),
              updatedAt: new Date(),
            });

            updateChat(chatId, {
              messages: [...updatedChat.messages, newAssistantMessage],
            });
          }
        },
      });
      updateChat(chatId, { status: ChatStatus.IDLE });

      if (isFirstMessage) {
        const title = await chatLlamaCPP.session.prompt(
          i18n.t('prompts:getChatTitle'),
        );
        const emoji = await chatLlamaCPP.session.prompt(
          i18n.t('prompts:getChatEmoji'),
        );
        updateChat(chatId, { title, emoji });
      }
    } catch (e: any) {
      console.error(e);
    }
  });
}
