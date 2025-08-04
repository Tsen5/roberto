import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { app, BrowserWindow, shell } from 'electron';
// import { registerLlmRpc } from "./rpc/llmRpc.ts";
import { getLlama } from 'node-llama-cpp';

import { registerChatIPC } from './ipc/chat';
import { registerGlobalIPC } from './ipc/global';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getModelsDirectory() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'models');
  } else {
    return path.join(__dirname, '..', 'models');
  }
}

const modelsDirectory = getModelsDirectory();

const llama = await getLlama();

// const modelPath = await resolveModelFile(
//   'hf:bartowski/gemma-2-2b-it-GGUF:Q6_K_L',
//   modelsDirectory,
// );

const modelPath = path.join(
  modelsDirectory,
  'hf_bartowski_gemma-2-2b-it.Q6_K_L.gguf',
);

export const model = await llama.loadModel({ modelPath });

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── index.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'logo.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    width: 1000,
    height: 700,
    // remove the default titlebar
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 10, y: 17 },
    // expose window controls in Windows/Linux
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
  });

  registerGlobalIPC();
  registerChatIPC(win);

  // open external links in the default browser
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('file://')) return { action: 'allow' };

    void shell.openExternal(url);
    return { action: 'deny' };
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    void win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    void win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);
