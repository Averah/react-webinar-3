import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from "../../utils";
import './style.css';
import Navbar from "../navbar";
import { useTranslation } from "../../store/use-translation";

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');

  const t = useTranslation();

  return (
    <div className={cn()}>
      <Navbar className={cn('navbar')} />
      <div className={cn('container')}>
        <span className={cn('label')}>{t('cartSummary')}</span>
        <span className={cn('total')}>
          {amount
            ? `${amount} ${plural(amount, {
              one: t('itemOne'),
              few: t('itemsFew'),
              many: t('itemsMany')
            })} / ${numberFormat(sum)} ₽`
            : t('empty')
          }
        </span>
        <button onClick={onOpen}>{t('openCart')}</button>
      </div>

    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0
}

export default memo(BasketTool);
