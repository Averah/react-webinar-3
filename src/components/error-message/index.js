import { memo } from 'react';
import PropTypes from "prop-types";
import './style.css';


function ErrorMessage({ errorText }) {
    return (
      <div className='ErrorMessage'>
        <h2>{errorText}</h2>
      </div>
    )
  };

ErrorMessage.propTypes = {
  errorText: PropTypes.string,
};

export default memo(ErrorMessage)