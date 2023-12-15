import { memo, useEffect } from 'react';
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

function Profile() {

    const select = useSelector(state => ({
        isAuthorized: state.login.isAuthorized,
        user: state.profile.user
    }));
    const store = useStore();


    const navigate = useNavigate();

    useEffect(() => {
        if (!select.isAuthorized) {
            navigate('/login');
        }
        store.actions.profile.getProfile();
    }, [select.isAuthorized])


    const { t } = useTranslate();

    return (
        <PageLayout>
            <AuthorizationMenu />
            <Head title={t('title')}>
                <LocaleSelect />
            </Head>
            <Navigation />
            <ProfileInfo t={t} user={select.user} />
        </PageLayout>
    );
}

export default memo(Profile);