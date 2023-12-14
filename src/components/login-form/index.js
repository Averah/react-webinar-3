import { memo, useRef, useState } from "react";
import './style.css';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

function LoginForm({ t, onLogin, waiting, error }) {

    const cn = bem('LoginForm');
    const [loginValue, setLogin] = useState('')
    const [passwordValue, setPassword] = useState('')


    const callbacks = {
        onSubmit: (e) => {
            e.preventDefault();
            onLogin({ login: loginValue, password: passwordValue });
        },
        onLoginChange: (e) => { setLogin(e.target.value) },
        onPasswordChange: (e) => { setPassword(e.target.value) }
    }
    return (
        <div className={cn()}>
            <h2>{t('login')}</h2>
            <form onSubmit={callbacks.onSubmit} className={cn('form')}>
                <div className={cn('login-input')}>
                    <label htmlFor="login">{t('username')}</label>
                    <input type="text" id="login" value={loginValue} onChange={callbacks.onLoginChange} />
                </div>
                <div className={cn('password-input')}>
                    <label htmlFor="password">{t('password')}</label>
                    <input type="password" id="password" value={passwordValue} onChange={callbacks.onPasswordChange} />
                </div>
                {error && <div className={cn('error')}>{error}</div>}
                <button type="submit" className={cn('button')} disabled={waiting}>{t('signin')}</button>
            </form>


        </div>
    )
}

LoginForm.propTypes = {
    t: PropTypes.func,
    onLogin: PropTypes.func,
    waiting: PropTypes.bool,
    error: PropTypes.string

};

LoginForm.defaultProps = {
    t: () => {
    },
    onLogin: () => {

    }

}

export default memo(LoginForm)