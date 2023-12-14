import { memo } from "react";
import Input from "../input";
import './style.css';
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';

function ProfileInfo({ t, user }) {
  const cn = bem('ProfileInfo');
  return (
    <div className={cn()}>
      <h2>{t('profile')}</h2>
      <div>{t('name')}: <b>{user?.profile?.name}</b></div>
      <div>{t('phone')}: <b>{user?.profile?.phone}</b></div>
      <div>email: <b>{user?.email}</b></div>
    </div>
  )
}

ProfileInfo.propTypes = {
  t: PropTypes.func,
  user: PropTypes.object
};

ProfileInfo.defaultProps = {
  t: () => {
  },


}

export default memo(ProfileInfo)