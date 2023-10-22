import { useEffect, useState, } from 'react';

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';
const isDarkOs = window && window.matchMedia && window.matchMedia(COLOR_SCHEME_QUERY)?.matches;

export function useDarkMode() {
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkOs);

  useEffect(() => {
    if (!window) return;
    if (!window.matchMedia) return;
    const matchMedia = window.matchMedia(COLOR_SCHEME_QUERY);

    function changeTheme(e: MediaQueryListEvent) {
      setIsDarkTheme(e?.matches || false);
    }

    matchMedia.addEventListener('change', changeTheme);
    return () => {
      matchMedia.removeEventListener('change', changeTheme);
    };
  }, []);

  return isDarkTheme
}

