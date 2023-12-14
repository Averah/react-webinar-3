import PropTypes from 'prop-types';
import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthorizationTool from '../../components/authorization-tool';
import SideLayout from '../../components/side-layout';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function AuthorizationMenu() {
    const navigate = useNavigate();
    const store = useStore();
    const { t } = useTranslate();
    const callbacks = {
        logout: useCallback(() => store.actions.login.logout(), [store]),
        onLoginNavigate: useCallback(() => navigate("/login"), []),
    }

    const select = useSelector(state => ({
        isAuthorized: state.login.isAuthorized,
        user: state.login.user
    }));

    return (
        <SideLayout padding="small" side="end">
            <AuthorizationTool
                t={t}
                onLoginNavigate={callbacks.onLoginNavigate}
                isAuthorized={select.isAuthorized}
                onLogout={callbacks.logout}
                user={select.user} />
        </SideLayout>
    )

}


AuthorizationMenu.propTypes = {
};

AuthorizationMenu.defaultProps = {

}


export default memo(AuthorizationMenu)
