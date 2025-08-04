import { BrowserWindow } from 'electron';
import { LlamaChatSession, LlamaContext } from 'node-llama-cpp';

import { Chat, Prompt, MessageFile } from '../types/chat';
import { createPrompt } from '../utils/createPrompt';

type ChatLlamaCPP = {
  context: LlamaContext;
  session: LlamaChatSession;
};

const chatsById: Record<string, Chat> = {};

const chatLlamaCPPsById: Record<string, ChatLlamaCPP> = {};

function broadcastChatUpdate(chatId: string, chat: Chat) {
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send('chat:update', chatId, chat);
    win.webContents.send('chats:update', Object.values(chatsById));
  });
}

export function getChat(chatId: string): Chat {
  const chat = chatsById[chatId];
  if (!chat) {
    throw new Error(`Chat ${chatId} not found`);
  }
  return chat;
}

export function getChats(): Chat[] {
  return Object.values(chatsById);
}

export function setChat(chatId: string, chat: Chat): Chat {
  chatsById[chatId] = chat;
  broadcastChatUpdate(chatId, chat);
  return chat;
}

export function updateChat(
  chatId: string,
  body: Partial<Omit<Chat, 'id'>>,
): Chat {
  const existingChat = getChat(chatId);
  const updatedChat = { ...existingChat, ...body, updatedAt: new Date() };
  setChat(chatId, updatedChat);
  return updatedChat;
}

export function deleteChat(chatId: string): void {
  delete chatsById[chatId];
  delete chatLlamaCPPsById[chatId];
  BrowserWindow.getAllWindows().forEach((win) => {
    win.webContents.send('chats:update', Object.values(chatsById));
  });
}

export function setChatCurrentPrompt(chatId: string, prompt: Prompt): Prompt {
  updateChat(chatId, { currentPrompt: prompt });
  return prompt;
}

export function updateChatCurrentPrompt(
  chatId: string,
  prompt: Partial<Prompt>,
): Prompt {
  const existingChat = getChat(chatId);
  const updatedPrompt = { ...existingChat.currentPrompt, ...prompt };
  return setChatCurrentPrompt(chatId, updatedPrompt);
}

export function clearChatCurrentPrompt(chatId: string): Prompt {
  const prompt = createPrompt();
  return setChatCurrentPrompt(chatId, prompt);
}

export function addChatCurrentPromptFiles(
  chatId: string,
  files: MessageFile[],
): MessageFile[] {
  const chat = getChat(chatId);
  const updatedPromptFiles = [...chat.currentPrompt.files, ...files];
  updateChatCurrentPrompt(chatId, { files: updatedPromptFiles });
  return updatedPromptFiles;
}

export function removeChatCurrentPromptFile(
  chatId: string,
  fileId: string,
): Prompt {
  const chat = getChat(chatId);
  const updatedPromptFiles = chat.currentPrompt.files.filter(
    (file) => file.id !== fileId,
  );
  return updateChatCurrentPrompt(chatId, { files: updatedPromptFiles });
}

export function getChatLlamaCPP(chatId: string): ChatLlamaCPP {
  const chatLlamaCPP = chatLlamaCPPsById[chatId];
  if (!chatLlamaCPP) {
    throw new Error(`Chat ${chatId} has no LlamaCPP session`);
  }
  return chatLlamaCPP;
}

export function setChatLlamaCPP(
  chatId: string,
  chatLlamaCPP: ChatLlamaCPP,
): ChatLlamaCPP {
  chatLlamaCPPsById[chatId] = chatLlamaCPP;
  return chatLlamaCPP;
}
