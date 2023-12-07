import {memo, useCallback, useEffect} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Basket from "../../app/basket";
import useSelector from "../../store/use-selector";
import useStore from "../../store/use-store";
import { useLocation } from 'react-router-dom';

function PageLayout({head, footer, children}) {

  const cn = bem('PageLayout');
  const activeModal = useSelector(state => state.modals.name);
  const store = useStore();
  const { pathname } = useLocation();
  const callbacks = {
    changeLanguage: useCallback(() => store.actions.language.toggleLanguage())
  }

  useEffect(() => {
    store.actions.modals.close()
  }, [store, pathname])

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      {activeModal === 'basket' && <Basket/>}
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);