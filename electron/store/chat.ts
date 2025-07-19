import { BrowserWindow } from 'electron';
import { LlamaChatSession, LlamaContext } from 'node-llama-cpp';

import { Chat } from '../types/chat';

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
