import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useTranslation } from '../../store/use-translation';
import { numberFormat } from '../../utils';
import "./style.css"

function ItemInformation({ item, onAdd }) {
  const cn = bem('ItemInformation');
  const callbacks = {
    addToBasket: () => onAdd(item._id)
  }

  const t = useTranslation();

  return (
    <div className={cn()}>
      <div className={cn('description')}>{item?.description}</div>
      <div className={cn('country')}>{t('manufactCountry')}: <b>{item?.madeIn.title} ({item?.madeIn.code})</b></div>
      <div className={cn('category')}>{t('category')}: <b>{item?.category.title}</b></div>
      <div className={cn('year')}>{t('manufactYear')}: <b>{item?.edition}</b></div>
      <div className={cn('price')}>
        <div >{t('price')}:</div>
        <div>{numberFormat(item?.price)} ₽</div>
      </div>
      <button className={cn('addButton')} onClick={callbacks.addToBasket}>{t('add')}</button>
    </div>
  )
}

ItemInformation.propTypes = {
  item: PropTypes.object,
  onAdd: PropTypes.func
};

ItemInformation.defaultProps = {
  onAdd: () => { },
}


export default memo(ItemInformation)

