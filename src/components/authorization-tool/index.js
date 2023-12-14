import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { Link } from "react-router-dom";
import './style.css';

function AuthorizationTool({ t, onLoginNavigate, isAuthorized, onLogout, user }) {
    const cn = bem('AuthorizationTool');

    return (
        <div className={cn()}>
            {isAuthorized ?
                <div>
                    <Link to='/profile'>{user?.profile?.name}</Link>
                    <button onClick={onLogout}>{t('logout')}</button>
                </div>

                : <button onClick={onLoginNavigate}>{t('login')}</button>}
        </div>
    );
}

AuthorizationTool.propTypes = {
    t: PropTypes.func,
    onLoginNavigate: PropTypes.func,
    isAuthorized: PropTypes.bool,
    onLogout: PropTypes.func,
    user: PropTypes.object
};

AuthorizationTool.defaultProps = {
    t: (text) => text,
    onLoginNavigate: () => { },
    onLogout: () => { }
}

export default memo(AuthorizationTool);