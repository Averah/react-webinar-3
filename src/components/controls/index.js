import {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { useTranslation } from "../../store/use-translation";

function Controls({onAdd}) {

  const t = useTranslation();
  
  return (
    <div className='Controls'>
      <button onClick={() => onAdd()}>{t('add')}</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

Controls.defaultProps = {
  onAdd: () => {}
}

export default memo(Controls);
