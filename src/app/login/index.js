import { memo, useCallback, useEffect } from 'react';
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
    waiting: state.login.waiting,
    error: state.login.error,
    isAuthorized: state.login.isAuthorized
  }));

  const callbacks = {
    login: useCallback(data => store.actions.login.login(data), [store]),
    cleanErrors: useCallback(() => store.actions.login.cleanErrors(), [store]),
  }

  useEffect(() => {
    select.isAuthorized && navigate(-1)
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
      <LoginForm t={t} onLogin={callbacks.login} waiting={select.waiting} error={select.error} />
    </PageLayout>
  );
}

export default memo(Login);