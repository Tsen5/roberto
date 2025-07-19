import { ipcMain } from 'electron';

export function registerGlobalIPC() {
  ipcMain.handle('global:platform', async () => {
    return process.platform;
  });
}
