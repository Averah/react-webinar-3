import useSelector from "./use-selector";
import enLangPackage from '../i18n/en.json';
import ruLangPackage from '../i18n/ru.json';

export const useTranslation = () => {
    const { lang } = useSelector(state => ({
        lang: state.language.lang
    }));

    const translate = (key) => lang === 'ru' ?  ruLangPackage[key] : enLangPackage[key];

    return translate;
}