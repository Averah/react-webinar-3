import {useCallback, useEffect, useState} from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  const callbacks = {
    setLang: useCallback((newLang) => i18n.setLang(newLang), []),
    t: useCallback((text, number) => i18n.translate(lang, text, number), [lang]),
  };

  useEffect(() => {
    const unsubscribe = i18n.subscribe((newLang) => {
      setLang(newLang)
    });

    return () => unsubscribe();
  }, []);

  return { lang, ...callbacks };
}
