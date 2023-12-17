import { memo, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthorizationMenu from '../../containers/authorization-menu';
import ProfileInfo from '../../components/profile-info';
import useSelector from '../../hooks/use-selector';
import useIsAuth from '../../hooks/use-is-auth';

function Profile() {

    const { isAuth, isAuthChecked } = useIsAuth();

    const select = useSelector(state => ({
        user: state.profile.user
    }));
    
    const store = useStore();

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (isAuthChecked && !isAuth) {
            navigate('/login');
        }
    }, [isAuth, isAuthChecked])

    useEffect(() => {
        if (isAuth) {
            store.actions.profile.getProfile();
        }
    }, [isAuth])


    const { t } = useTranslate();

    return (
        <PageLayout>
            <AuthorizationMenu />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            {isAuthChecked && <ProfileInfo t={t} user={select.user} />}
        </PageLayout>
    );
}

export default memo(Profile);