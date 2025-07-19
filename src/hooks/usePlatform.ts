import { useCallback, useEffect, useState } from 'react';

const usePlatform = (): NodeJS.Platform | null => {
  const [platform, setPlatform] = useState<NodeJS.Platform | null>(null);

  const getPlatform = useCallback(async () => {
    setPlatform(await window.ipcRenderer.invoke('global:platform'));
  }, []);

  useEffect(() => {
    void getPlatform();
  }, [getPlatform]);

  return platform;
};

export default usePlatform;
