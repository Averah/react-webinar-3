import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from 'react-router-dom';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthorizationMenu from '../../containers/authorization-menu';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';

function Login() {

  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    isWaiting: state.login.isWaiting,
    error: state.login.error,
    isAuthorized: state.login.isAuthorized,
    isUserAuthChecked: state.login.isUserAuthChecked
  }));

  const callbacks = {
    login: useCallback(data => store.actions.login.login(data), [store]),
    cleanErrors: useCallback(() => store.actions.login.cleanErrors(), [store]),
  }

  useLayoutEffect(() => {
    select.isAuthorized && navigate('/profile');
  }, [select.isAuthorized])

  useEffect(() => {
    return () => {
      callbacks.cleanErrors();
    }
  }, [])

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthorizationMenu onLogout={callbacks.logout} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.isUserAuthChecked && 
        <LoginForm t={t} onLogin={callbacks.login} isWaiting={select.isWaiting} error={select.error} />}
      
    </PageLayout>
  );
}

export default memo(Login);