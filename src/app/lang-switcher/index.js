import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import { useTranslation } from "../../store/use-translation";

function LangSwitcher() {

  const store = useStore();

  const cn = bem('LangSwitcher');

  const t = useTranslation();

  const onLangChange = () => {
    store.actions.language.toggleLanguage()
  }

  return (
    <div className={cn()} onClick={onLangChange}>
      {t('lang')}
    </div>
  );
}

export default memo(LangSwitcher);
