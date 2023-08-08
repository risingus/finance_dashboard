import { useEffect, useState } from 'react';

export const useThemeSelector = () => {
  const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());

  function changeTheme(event: MediaQueryListEvent) {
    setIsDarkTheme(event.matches);
  }

  useEffect(() => {
    const machineTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const removeListener = () => machineTheme.removeEventListener('change', changeTheme);
    const addListener = () => machineTheme.addEventListener('change', changeTheme);
    addListener();
    return () => removeListener();
  }, [])

  return isDarkTheme
}